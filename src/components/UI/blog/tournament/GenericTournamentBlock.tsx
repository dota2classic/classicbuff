import styled from "styled-components";
import { colors } from "shared";
import React, { PropsWithChildren, ReactNode } from "react";
import cx from "classnames";
import { IRouterPage } from "utils/route";
import Link from "next/link";
import { pendingAnimation } from "components/UI/SearchGameBar/SearchGameButton";

const Block = styled.a<{ img: string }>`
  background-image: url("${p => p.img}");
  background-size: cover;
  text-decoration: none;
  padding: 0px;
  color: ${colors.primaryText};
  width: 500px;
  max-width: 500px;
  height: 250px;
  display: flex;
  align-items: center;
  overflow:hidden;
  position: relative;
  justify-content: center;
  flex-direction: column;
  font-size: 28px;
  border-radius: 5px;
  transition: 0.3s ease;
  
  &.small {
    text-align: center;
    width: 326px;
    max-width: 326px;
    height: 250px;
    font-size: 20px;
  }
  
  & .main-content {
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    flex-direction: column;
  }
  
  &:hover{
    color: ${colors.primaryText};
    &::before {
       background: rgba(14,14,14,0.9);
    }
  }
  
  & .main-content {
    transition: 0.3s ease;
  }
  
  & .hover-content {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    transition: 0.3s ease;
  }
  
  & .main-content > span {
    text-align: center;
  }
  
  &.hoverable:hover {
    & .main-content{
      opacity: 0;
    }
    & .hover-content {
      top: 0;
    }
  }
  
  &::before{
    transition: 0.3s ease;
    content: '';
    z-index: -1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(14,14,14,0.5);
    border-radius: 5px;
  }
  
  z-index: 1;
  
  
 
  &:hover{
     & .team-image {
        z-index: 0;
     }
  }
  & .team-image {
    z-index: -2;
    filter: drop-shadow(1px 1px 0 #000) drop-shadow(-1px -1px 0 #000);
    width: 40px;
    height: 40px;
    object-fit: cover;
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

interface Props {
  img: string;
  hover?: ReactNode;
  link?: IRouterPage;
  teamImage?: string;
  small?: boolean;
}

export default (props: PropsWithChildren<Props>) => {
  return (
    <div>
      {(props.link && (
        <Link passHref {...props.link.link}>
          <Block img={props.img} className={cx(props.hover && "hoverable", props.small && "small")}>
            <div className="main-content">{props.children}</div>
            <div className="hover-content">{props.hover}</div>
            {props.teamImage && <img className="team-image" src={props.teamImage} />}
          </Block>
        </Link>
      )) || (
        <Block img={props.img} className={cx(props.hover && "hoverable", props.small && "small")}>
          <div className="main-content">{props.children}</div>
          <div className="hover-content">{props.hover}</div>
          {props.teamImage && <img className="team-image" src={props.teamImage} />}
        </Block>
      )}
    </div>
  );
};

import styled from "styled-components";
import { colors } from "../shared/styles";
import React, { MouseEventHandler, ReactNode } from "react";
import { ExitIcon } from "../../assets";

const StyledSidebarItem = styled.div`
  padding: 4px 0;
  border-bottom: 1px solid ${colors.text.header};
`;

const Container = styled.a`
  display: flex;
  align-items: center;

  cursor: pointer;
  text-decoration: none;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;

  padding: 0 16px 0 20px;
  border-radius: 6px;

  height: 40px;

  transition: background-color 0.15s ease;

  &.active {
    background: #293e4c;
  }

  &:hover {
    background: #293e4c;
  }

  color: ${colors.common.background};
`;

const Title = styled.div`
  flex: 1;
`;

interface ISidebarItem {
  title: string;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  active?: boolean;
  right?: ReactNode;
}

export const SidebarItem = (props: ISidebarItem) => (
  <StyledSidebarItem>
    <Container className={props.active ? "active" : ""} href={props.href} onClick={props.onClick}>
      <Title>{props.title}</Title>
      {props.right}
    </Container>
  </StyledSidebarItem>
);

const LogoutContainer = styled(Container)`
  font-size: 12px;
  line-height: 14px;

  color: ${colors.text.secondary};
`;

export interface ISidebarLogout {
  email: string;
}

export const SidebarLogout = (props: ISidebarLogout) => (
  <LogoutContainer>
    <Title>{props.email}</Title>
    <ExitIcon />
  </LogoutContainer>
);

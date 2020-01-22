import React, { ReactNode } from "react";
import styled from "styled-components";
import cx from "classnames";
import Loader from "./Loader";

interface ILoaderBlock {
  loading?: boolean;
  children?: ReactNode;
  marginTop?: number;
}

export const StyledLoaderBlock = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;

  flex: 1;
`;

const Overlay = styled.div<{ top?: number }>`
  position: absolute;

  top: ${props => props.top || 0}px;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(255, 255, 255, 0.6);

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: opacity 0.2s ease-in;
  opacity: 0;
  pointer-events: none;

  & > * {
    margin: 16px;
  }

  &.visible {
    opacity: 1;
    pointer-events: all;
  }
`;

const LoaderBlock = (props: ILoaderBlock) => (
  <StyledLoaderBlock>
    {props.children}
    <Overlay className={cx(props.loading && "visible")} top={props.marginTop}>
      <Loader />
    </Overlay>
  </StyledLoaderBlock>
);

export default LoaderBlock;

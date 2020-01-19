import React, { ReactNode } from "react";
import styled from "styled-components";
import cx from "classnames";
import Loader from "./Loader";

interface ILoaderBlock {
  loading?: boolean;
  children?: ReactNode;
}

export const StyledLoaderBlock = styled.div`
  display: inline-flex;
  position: relative;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: rgba(255, 255, 255, 0.5);

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
    <Overlay className={cx(props.loading && "visible")}>
      <Loader />
    </Overlay>
  </StyledLoaderBlock>
);

export default LoaderBlock;

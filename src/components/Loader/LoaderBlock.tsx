import React, { ReactNode } from "react";
import styled from "styled-components";
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

  padding: 16px;

  background: rgba(255, 255, 255, 0.5);

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: opacity 0.3s ease-in;
  opacity: 0;
  pointer-events: none;

  &.visible {
    opacity: 1;
    pointer-events: all;
  }
`;

const LoaderBlock = (props: ILoaderBlock) => (
  <StyledLoaderBlock>
    {props.children}
    <Overlay className={props.loading ? "visible" : ""}>
      <Loader />
    </Overlay>
  </StyledLoaderBlock>
);

export default LoaderBlock;

import React from "react";
import styled from "styled-components";
import Loader from "./Loader";

interface ILoadingNext {
  hasNext?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 60px;
  max-height: 0;

  flex-shrink: 0;
  overflow: hidden;

  transition: max-height 0.2s ease-in;

  & > * {
    margin: 16px;
  }

  &.visible {
    max-height: 60px;
  }
`;

const LoadingNext = (props: ILoadingNext) => (
  <Container className={props.hasNext ? "visible" : ""}>
    <Loader />
  </Container>
);

export default LoadingNext;

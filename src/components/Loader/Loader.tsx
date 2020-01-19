import React from "react";
import styled, { keyframes } from "styled-components";
import { colors } from "../shared/styles";

const colorAnimation = keyframes`
  from {
    background: ${colors.frame.tiling};
  }

  to {
    background: ${colors.frame.stroke};
  }
`;

const Dot = styled.div`
  width: 16px;
  height: 16px;

  border-radius: 8px;

  animation: ${colorAnimation} 0.6s ease-in-out infinite alternate;

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.4s;
  }
`;

const Container = styled.div`
  display: inline-flex;
  
  ${Dot} + ${Dot} {
    margin-left: 4px;
  }
`;

const Loader = (props: {}) => (
  <Container>
    <Dot />
    <Dot />
    <Dot />
  </Container>
);

export default Loader;

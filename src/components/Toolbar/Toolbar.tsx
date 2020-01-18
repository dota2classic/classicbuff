import React, { ReactNode } from "react";
import styled from "styled-components";
import { color } from "../shared/styles";

const StyledToolbar = styled.div`
  display: flex;
  padding: 6px 20px;
  background: ${color.common.background};
  color: ${color.text.header};

  border-bottom: 1px solid ${color.frame.stroke};
`;

const ToolbarTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;

  flex: 1;
`;

interface IToolbar {
  title: ReactNode;
  children?: ReactNode;
}

const Toolbar = ({ title, children }: IToolbar) => (
  <StyledToolbar>
    <ToolbarTitle>{title}</ToolbarTitle>
    {children}
  </StyledToolbar>
);

export default Toolbar;

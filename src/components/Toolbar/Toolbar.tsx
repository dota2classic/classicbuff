import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../shared/styles";

const StyledToolbar = styled.div`
  display: flex;
  padding: 6px 20px;
  background: ${colors.common.background};
  color: ${colors.text.header};

  flex-shrink: 0;

  border-bottom: 1px solid ${colors.frame.stroke};
`;

const ToolbarTitle = styled.div`
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

export const Toolbar = ({ title, children }: IToolbar) => (
  <StyledToolbar>
    <ToolbarTitle>{title}</ToolbarTitle>
    {children}
  </StyledToolbar>
);

export default Toolbar;

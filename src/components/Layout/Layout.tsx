import React, { ReactNode } from "react";
import styled from "styled-components";

interface ILayout {
  sidebar: ReactNode;
  children?: ReactNode;
}

const StyledLayout = styled.div`
  display: flex;
  align-items: stretch;

  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  flex: 1;
`;

const Layout = (props: ILayout) => (
  <StyledLayout>
    {props.sidebar}
    <Container>{props.children}</Container>
  </StyledLayout>
);

export default Layout;

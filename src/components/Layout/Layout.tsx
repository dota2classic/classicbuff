import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: flex;
  position: relative;
  align-items: stretch;

  width: 100%;
  height: 100%;

  max-height: 100vh;

  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  top: 43px;
  right: 0;
  bottom: 0;
`;

export interface ILayout {
  sidebar: ReactNode;
  filters: ReactNode;
  children?: ReactNode;
}

const Layout = (props: ILayout) => (
  <StyledLayout>
    {props.sidebar}
    <Container>{props.children}</Container>
    <Filters>{props.filters}</Filters>
  </StyledLayout>
);

export default Layout;

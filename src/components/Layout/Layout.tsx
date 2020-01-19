import React, { ReactNode } from "react";
import styled from "styled-components";

interface ILayout {
  sidebar: ReactNode;
  filters: ReactNode;
  showFilters?: boolean;
  children?: ReactNode;
}

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

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  top: 43px;
  right: 0;
  bottom: 0;

  transform: translate(300px, 0);
  transition: transform 0.3s ease;

  &.show {
    transform: translate(0, 0);
  }
`;

const Layout = (props: ILayout) => (
  <StyledLayout>
    {props.sidebar}
    <Container>{props.children}</Container>
    <FiltersWrapper className={props.showFilters ? "show" : ""}>{props.filters}</FiltersWrapper>
  </StyledLayout>
);

export default Layout;

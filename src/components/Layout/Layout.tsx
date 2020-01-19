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
  align-items: stretch;

  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  flex: 1;
`;

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  top: 43px;
  right: 0;
  bottom: 0;
`;

const Layout = (props: ILayout) => (
  <StyledLayout>
    {props.sidebar}
    <Container>{props.children}</Container>
    <FiltersWrapper className={props.showFilters ? "show" : ""}>{props.filters}</FiltersWrapper>
  </StyledLayout>
);

export default Layout;

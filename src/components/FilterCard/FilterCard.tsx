import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../shared/styles";
import FilterCardHeader from "./FilterCardHeader";

const Wrapper = styled.div`
  width: 280px;

  background: ${colors.frame.card};
  box-shadow: 0 11px 15px rgba(0, 0, 0, 0.2), 0 9px 46px rgba(0, 0, 0, 0.12), 0 24px 38px rgba(0, 0, 0, 0.14);
  border-radius: 8px 0 0 8px;
`;

const Content = styled.div`
  padding: 0 10px;
`;

interface IFilterCard {
  onClear: () => void;
  onClose: () => void;
  children?: ReactNode;
}

const FilterCard = (props: IFilterCard) => (
  <Wrapper>
    <FilterCardHeader onClear={props.onClear} onClose={props.onClose} />
    <Content>{props.children}</Content>
  </Wrapper>
);

export default FilterCard;

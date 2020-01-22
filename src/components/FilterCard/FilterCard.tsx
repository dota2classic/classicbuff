import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../shared/styles";
import FilterCardHeader from "./FilterCardHeader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 280px;

  background: ${colors.frame.card};
  border-radius: 8px 0 0 8px;

  max-height: 100%;

  transform: translate3d(20%, 0, 0);
  transition: all 0.15s ease;

  pointer-events: none;
  opacity: 0;

  &.show {
    pointer-events: all;
    opacity: 1;

    transform: translate3d(0, 0, 0);
    box-shadow: 0 11px 15px rgba(0, 0, 0, 0.2), 0 9px 46px rgba(0, 0, 0, 0.12), 0 24px 38px rgba(0, 0, 0, 0.14);
  }
`;

const Content = styled.div`
  padding: 0 10px 40px;

  overflow-y: scroll;
`;

interface IFilterCard {
  show?: boolean;
  onClear: () => void;
  onClose: () => void;
  children?: ReactNode;
}

const FilterCard = (props: IFilterCard) => (
  <Wrapper className={props.show ? "show" : ""}>
    <FilterCardHeader onClear={props.onClear} onClose={props.onClose} />
    <Content>{props.children}</Content>
  </Wrapper>
);

export default FilterCard;

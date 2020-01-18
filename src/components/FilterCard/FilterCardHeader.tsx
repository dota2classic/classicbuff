import styled from "styled-components";
import { colors } from "../shared/styles";
import Button from "../Button/Button";
import { CloseIcon } from "../../assets";
import React from "react";

const Header = styled.div`
  display: flex;
  align-items: center;

  padding: 0 10px;
  height: 40px;

  border-bottom: 1px solid ${colors.frame.stroke};
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const CloseButton = styled.button`
  display: flex;

  outline: none;
  border: none;

  padding: 0;
  border-radius: 5px;
  cursor: pointer;

  background: none;
  color: ${colors.button.main};
  svg {
    fill: ${colors.button.main} !important;
  }

  &:hover {
    background: ${colors.frame.bar};
  }
`;

interface IFilterCardHeader {
  onClear: () => void;
  onClose: () => void;
}

const FilterCardHeader = (props: IFilterCardHeader) => (
  <Header>
    <HeaderContent>
      <Button type="tertiary" text="Сбросить все" onClick={props.onClear} />
    </HeaderContent>
    <CloseButton onClick={props.onClose}>
      <CloseIcon />
    </CloseButton>
  </Header>
);

export default FilterCardHeader;

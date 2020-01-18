import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import { colors } from "../../shared/styles";
import { rgba } from "polished";
import { iconUrlData } from "../../../assets";

interface ICheckbox {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Label = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  padding: 4px 0;
`;

const LabelText = styled.span`
  padding-left: 28px;
`;

const Input = styled.input`
  margin: 0 0.4em 0 0;
  position: absolute;
  //font-size: initial;
  opacity: 0;
  //vertical-align: text-top;

  & + ${LabelText} {
    &:before,
    &:after {
      position: absolute;
      top: 3px;
      left: 3px;
      height: 18px;
      width: 18px;
      content: "";
      display: block;
      transition: all 150ms ease;
    }
    &:before {
      border-radius: 5px;

    }
    &:after {
      border-radius: 3px;
    }
  }

  & + ${LabelText}:before {
    box-shadow: ${colors.frame.stroke} 0 0 0 1px inset;
  }
  &:focus + ${LabelText}:before {
    box-shadow: ${colors.button.main} 0 0 0 1px inset;
  }
  &:checked + ${LabelText}:before {
    box-shadow: ${colors.button.main} 0 0 0 1px inset;
  }
  &:checked:focus + ${LabelText}:before {
    box-shadow: ${colors.button.main} 0 0 0 1px inset, ${rgba(colors.button.main, 0.3)} 0 0 2px 2px;
  }
  & + ${LabelText}:after {
    background-size: 200%;
    background: url('data:image/svg+xml;utf8,${iconUrlData("done")}') 50% 50%;
    transform: scale3d(0, 0, 1);
    margin-left: 3px;
    margin-top: 3px;
    height: 12px;
    width: 12px;
    opacity: 0;
  }
  &:checked + ${LabelText}:after {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
`;

const Checkbox = (props: ICheckbox) => (
  <Label>
    <Input type="checkbox" checked={props.checked} onChange={props.onChange} disabled={props.disabled} />
    <LabelText>{props.label}</LabelText>
  </Label>
);

export default Checkbox;

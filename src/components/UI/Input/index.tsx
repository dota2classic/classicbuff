import styled from "styled-components";
import { colors } from "../../../shared";
import React from "react";

const Input = styled.input`
  padding: 12px;
  border: none;
  outline: none;
  background: ${colors.evenDarkerBg};
  font-size: 14px;
  border-radius: 4px;
  transition: 0.3s ease;
  font-family: "Trajan Pro 3", sans-serif;
  color: ${colors.primaryText};

  cursor: pointer;

  &:hover {
    color: ${colors.primaryTextHighlight};
    background: ${colors.almostBlack};
  }

  margin-bottom: 20px;

  &.small {
    padding: 6px;
    font-size: 14px;
    margin-bottom: 0;
  }

  &.iso {
    margin-bottom: 0;
  }
`;

export const Textarea = styled.textarea`
  padding: 12px;
  border: none;
  outline: none;
  resize: vertical;
  background: ${colors.evenDarkerBg};
  font-size: 14px;
  border-radius: 4px;
  transition: color background 0.3s ease;
  font-family: "Trajan Pro 3", sans-serif;
  color: ${colors.primaryText};

  cursor: pointer;

  &:hover {
    color: ${colors.primaryTextHighlight};
    background: ${colors.almostBlack};
  }

  margin-bottom: 20px;

  &.small {
    padding: 6px;
    font-size: 14px;
    margin-bottom: 0;
  }

  &.iso {
    margin-bottom: 0;
  }
`;

export default Input;

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onChangeNumber(val: number): void;
}
export const NumberInput = (props: Props) => {
  return (
    <Input
      {...(props as any)}
      onChange={e => {
        const val = Number(e.target.value);
        if (!Number.isNaN(val)) {
          props.onChangeNumber(val);
        }
      }}
    />
  );
};

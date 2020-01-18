import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

export interface IInput {
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const StyledInput = styled.input`
  display: flex;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;

  padding: 8px 10px 6px 10px;

  border: 1px solid #bdcfdb;
  box-sizing: border-box;
  border-radius: 5px;

  min-width: 420px;

  &::placeholder {
    color: #7b8f9d;
  }
`;

const Input = (props: IInput) => <StyledInput {...props} />;

Input.defaultProps = {};

export default Input;

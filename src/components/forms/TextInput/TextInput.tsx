import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

export interface ITextInput {
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const StyledTextInput = styled.input`
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

const TextInput = (props: ITextInput) => <StyledTextInput {...props} />;

TextInput.defaultProps = {};

export default TextInput;

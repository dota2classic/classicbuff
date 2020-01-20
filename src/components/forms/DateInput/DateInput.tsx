import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

export interface IDateInput {
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const StyledDateInput = styled.input`
  display: flex;
  font-size: 14px;
  line-height: 16px;

  padding: 8px 10px 6px 10px;

  border: 1px solid #bdcfdb;
  box-sizing: border-box;
  border-radius: 5px;

  &::placeholder {
    color: #7b8f9d;
  }
`;

const DateInput = (props: IDateInput) => <StyledDateInput type="date" {...props} />;

DateInput.defaultProps = {};

export default DateInput;

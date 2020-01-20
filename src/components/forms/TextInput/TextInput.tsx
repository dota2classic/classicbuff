import React, { ChangeEventHandler, ReactNode } from "react";
import styled from "styled-components";

export interface ITextInput {
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
}

export const StyledTextInput = styled.div`
  display: flex;
  position: relative;
`;

export const StyledInput = styled.input`
  display: flex;

  flex: 1;
  font-size: 14px;
  line-height: 16px;

  padding: 8px 10px 6px 10px;

  border: 1px solid #bdcfdb;
  box-sizing: border-box;
  border-radius: 5px;

  &::placeholder {
    color: #7b8f9d;
  }

  &.with-icon {
    padding-right: 40px;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;

  top: 4px;
  bottom: 4px;
  right: 8px;

  display: flex;
  align-items: center;

  pointer-events: none;
`;

class TextInput extends React.Component<ITextInput> {
  static defaultProps = {
    value: "",
    onChange: () => undefined,
    placeholder: "",
    icon: null
  };

  render() {
    let { icon, value, placeholder } = this.props;
    return (
      <StyledTextInput>
        <StyledInput
          className={icon ? "with-icon" : ""}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {icon && <IconWrapper>{icon}</IconWrapper>}
      </StyledTextInput>
    );
  }

  onChange: ChangeEventHandler<HTMLInputElement> = e => {
    this.props.onChange(e.target.value);
  };
}

export default TextInput;

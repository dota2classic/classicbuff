import React, { ReactNode } from "react";
import { IconWrapper, StyledButton, Text } from "./Button.styled";

export interface IButton {
  text: string;
  style: "primary" | "secondary" | "tertiary";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Button = (props: IButton) => (
  <StyledButton className={props.style}>
    {props.iconLeft && <IconWrapper>{props.iconLeft}</IconWrapper>}
    <Text>{props.text}</Text>
    {props.iconRight && <IconWrapper>{props.iconRight}</IconWrapper>}
  </StyledButton>
);

Button.defaultProps = {
  style: "primary"
};

export default Button;

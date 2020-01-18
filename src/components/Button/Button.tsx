import React, { MouseEventHandler, ReactNode } from "react";
import { IconWrapper, StyledButton, Text } from "./Button.styled";

export interface IButton {
  text?: string;
  type: "primary" | "secondary" | "tertiary";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = (props: IButton) => (
  <StyledButton className={props.type} onClick={props.onClick}>
    {props.iconLeft && <IconWrapper>{props.iconLeft}</IconWrapper>}
    {props.text && <Text>{props.text}</Text>}
    {props.iconRight && <IconWrapper>{props.iconRight}</IconWrapper>}
  </StyledButton>
);

Button.defaultProps = {
  type: "primary"
};

export default Button;

import React, { ReactNode } from "react";
import { ButtonIconWrapper, StyledButton, Text } from "./Button.styled";

export interface IButton {
  text?: string;
  type: "primary" | "secondary" | "tertiary";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onClick?: () => void;
}

const Button = (props: IButton) => (
  <StyledButton className={props.type} onClick={props.onClick}>
    {props.iconLeft && <ButtonIconWrapper>{props.iconLeft}</ButtonIconWrapper>}
    {props.text && <Text>{props.text}</Text>}
    {props.iconRight && <ButtonIconWrapper>{props.iconRight}</ButtonIconWrapper>}
  </StyledButton>
);

Button.defaultProps = {
  type: "primary"
};

export default Button;

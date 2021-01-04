import styled from "styled-components";
import { colors } from "../../../shared";

const Button = styled.button`
  padding: 12px;
  border: none;
  outline: none;
  background: rgba(0, 0, 0, 0.3);
  font-size: 18px;
  border-radius: 4px;
  transition: 0.3s ease;
  font-family: "Trajan Pro 3", sans-serif;
  color: ${colors.primaryText};

  width: fit-content;

  &:disabled {
    background: rgba(0, 0, 0, 0.1);
    color: ${colors.primaryTextDark};
    cursor: not-allowed;
  }

  &.small {
    font-size: 14px;
    padding: 6px;
  }

  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${colors.primaryTextHighlight};
    background: rgba(0, 0, 0, 0.8);
  }

  &.icon {
    width: 42px;
    height: 42px;
  }
`;

export const LinkButton = styled.a`
  width: fit-content;
  padding: 12px;
  border: none;
  text-decoration: none;
  outline: none;
  background: rgba(0, 0, 0, 0.3);
  font-size: 18px;
  border-radius: 4px;
  transition: 0.3s ease;
  font-family: "Trajan Pro 3", sans-serif;
  color: ${colors.primaryText};

  cursor: pointer;
  &:hover {
    color: ${colors.primaryTextHighlight};
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default Button;

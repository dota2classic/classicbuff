import styled from "styled-components";

const Button = styled.button`
  padding: 12px;
  border: none;
  outline: none;
  background: rgba(0, 0, 0, 0.3);
  font-size: 18px;
  border-radius: 4px;
  transition: 0.3s ease;
  font-family: "Trajan Pro 3", sans-serif;
  color: white;

  width: fit-content;
  &:disabled {
    background: rgba(0, 0, 0, 0.3);
    cursor: not-allowed;
  }

  &.small {
    font-size: 14px;
    padding: 6px;
  }

  cursor: pointer;
  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const LinkButton = styled.a`
  padding: 12px;
  border: none;
  text-decoration: none;
  outline: none;
  background: rgba(0, 0, 0, 0.3);
  font-size: 18px;
  border-radius: 4px;
  transition: 0.3s ease;
  font-family: "Trajan Pro 3", sans-serif;
  color: white;

  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export default Button;

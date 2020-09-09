import styled from "styled-components";

const Input = styled.input`
  padding: 12px;
  border: none;
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

export default Input;

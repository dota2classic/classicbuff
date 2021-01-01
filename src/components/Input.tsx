import styled from "styled-components";

const Input = styled.input`
  padding: 12px;
  border: none;
  outline: none;
  background: rgba(0, 0, 0, 0.2);
  font-size: 14px;
  border-radius: 4px;
  transition: 0.3s ease;
  font-family: "Trajan Pro 3", sans-serif;
  color: white;

  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  margin-bottom: 20px;
  &.small {
    padding: 6px;
    font-size: 14px;
    margin-bottom: 0;
  }
  &.iso {
    margin-bottom: 0;
  }
`;

export default Input;

import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;

  min-width: 400px;

  & input + input {
    margin-top: 10px;
  }
`;

export default Form;

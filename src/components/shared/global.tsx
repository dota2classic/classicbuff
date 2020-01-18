import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body, #root {
    height: 100%;
  }
  
  body {
    background: #F8FAFB;
  }
`;

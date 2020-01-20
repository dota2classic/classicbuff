import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { colors } from "./styles";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body, #root, #__next {
    height: 100%;
  }
  
  body {
    background: ${colors.common.background};
    
    font-family: Roboto, serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    
    color: ${colors.text.main};
  }
  
  * {
    box-sizing: border-box;
  }
`;

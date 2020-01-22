import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { colors } from "./styles";

export const fontUrl =
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700,800,900&display=swap&subset=cyrillic";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  @import url('${fontUrl}');

  html, body, #root, #__next {
    height: 100%;
  }
  
  body {
    background: ${colors.common.background};
    
    font-family: 'Roboto', sans-serif;
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

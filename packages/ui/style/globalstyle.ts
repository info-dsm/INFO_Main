import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  body {
    user-select:none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    overflow-x: hidden;
    scroll-behavior: smooth;
     margin: 0;
    ::-webkit-scrollbar {
    background-color: ${(props) => props.theme.colors.gray};
    width: 10px;
   
    }
    ::-webkit-scrollbar-thumb {
      background-color: #6141cc;
      border-radius: 3px;
      width: 10px;
    }
  }
  html {  
    font-size: 20px;
    @media (max-width: 1000px) {
      font-size: 12px;
    }
  }
  * {
    outline: none;
    box-sizing: border-box;
  }
`;

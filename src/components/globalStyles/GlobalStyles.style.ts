import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  html {
    /* font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300))); */
    box-sizing: border-box;
    height:100%
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-family: "Roboto","Arial",sans-serif;;
    font-weight: normal;

    min-height: 100vh;
    display: flex;
    flex-direction: column;
    height:100%
  }

  #root{
    height:100%
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding-left: 0px;
  }

`;

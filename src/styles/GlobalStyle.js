import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    border: 0;
    font-style: inherit;
    font-family: ' Segoe UI ' , Tahoma , Geneva , Verdana , sans-serif;
    font-size: 100%;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after, q:before, q:after {
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: #797d86;
    text-decoration: none;
  }

  section {
    text-align: center;
   }

  .test {
  text-decoration: line-through solid black;
  }
`;

export default GlobalStyle;

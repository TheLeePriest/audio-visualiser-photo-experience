import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        box-sizing: border-box;
    }
     
    a {
        color: ${({ theme }) => theme.link};
        text-decoration: none;
    }
    
    h1 {
        font-family: Qartella Heavy;
    }
    
    body {
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        min-height: 100vh;
        min-width: 100vw;
        margin: 0;
        padding: 0;
        font-family: Qartella Regular, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        transition: all 0.25s linear;
    }`;

export default GlobalStyles;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px #00B4FF;
    }

    body {
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button, select {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`;

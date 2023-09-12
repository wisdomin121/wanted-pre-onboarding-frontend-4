import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

const GlobalStyles = createGlobalStyle`
${reset},
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body {
        height: 100%;
        font-family: 'Spoqa Han Sans Neo', 'sans-serif';
        font-size: '16px';
        color: '#000000';
    }
    body {
        background: '#ffffff';
    }
    a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
    }
    button, 
    input, 
    textarea, 
    select, 
    option {
        font-family: inherit;
        color: inherit;
        font-size: inherit;
        border: 0;
        outline: 0;
        background-color: transparent;
    }
    button:focus, 
    input:focus, 
    textarea:focus, 
    select:focus{
        outline: none;
    }
`

export default GlobalStyles

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { ThemeProvider, createTheme } from "@mui/material/styles";


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ThemeProvider theme={createTheme()}>
        <App />
    </ThemeProvider>
)

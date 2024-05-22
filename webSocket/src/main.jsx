import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
//import {CSSBaseline} from '@mui/material';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <ThemeProvider theme={theme}>
  <CssBaseline />
    <App />
  </ThemeProvider>
  </>
);

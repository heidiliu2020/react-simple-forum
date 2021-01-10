import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./constants/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

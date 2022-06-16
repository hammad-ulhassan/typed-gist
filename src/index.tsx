import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./App";

const rootElement = document.getElementById("root") as Element;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

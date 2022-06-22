import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RoutePaths } from "./RoutePaths/RoutePaths";


export const App = () => {
  return (
    <BrowserRouter>
      <RoutePaths />
    </BrowserRouter>
  );
};

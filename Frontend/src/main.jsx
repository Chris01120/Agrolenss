import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AgroLensProvider } from "./lib/agrolens-store";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AgroLensProvider>
        <App />
      </AgroLensProvider>
    </BrowserRouter>
  </React.StrictMode>
);
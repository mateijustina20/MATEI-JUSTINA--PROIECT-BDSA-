import React from "react";
import ReactDOM from "react-dom/client"; // Corect pentru React 18
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Creează rădăcina
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

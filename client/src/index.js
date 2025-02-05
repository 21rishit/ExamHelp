import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SearchProvider } from "./context/searchContext";
import "@fortawesome/fontawesome-free/css/all.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SearchProvider>
    <App />
  </SearchProvider>
);

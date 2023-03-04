import App from "./components/App/App";
import React from "react";
import ReactDOM from "react-dom/client";

const documentRoot = ReactDOM.createRoot(document.querySelector(".root"));
documentRoot.render(
  <React.StrictMode>
   <App/>
  </React.StrictMode>
);

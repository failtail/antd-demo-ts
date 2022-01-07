import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BrowserRouter from "./react-router-dom/BrowserRouter";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* 所以这样写或报错  bundle.js:1519 Uncaught Invariant Violation: A <Router> may have only one child element*/}
      {/* <div>hh</div> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

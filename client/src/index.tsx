import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL =
    "https://us-central1-cs3219-otot-37c4a.cloudfunctions.net/api";
} else {
  axios.defaults.baseURL = "/cs3219-otot-37c4a/us-central1/api";
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

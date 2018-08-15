import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";

Modal.setAppElement("#root");

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

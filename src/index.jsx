import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import App from "./components/App";
import { store } from "./redux/configurestore";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

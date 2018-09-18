import React from "react";
import ReactDOM from "react-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";

import models from "./models/";
import App from "./App";

import "./styles/main.css";

const store = init({
  models
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#app')
);

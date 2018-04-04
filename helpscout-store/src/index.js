import React from "react";
import ReactDOM from "react-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";

import history from "./history";
import models from "./models/";
import App from "./App";

import "./styles/main.css";

import { map, last } from './data/books';

// Example data.
models.books.state = {...models.books.state, map, last};

const store = init({
  models,
});

// Initial route.
store.dispatch.router.route(history.location);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.querySelector('#app')
);

import React, { Component } from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import store from "../store";

import Feed from "./feed/Feed";

import "./../styles/styles.scss";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Feed />
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

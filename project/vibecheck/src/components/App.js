import React, { Component } from "react";
import { render } from "react-dom";
import Feed from "./feed/Feed";
import "./../styles/styles.scss";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Feed />
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

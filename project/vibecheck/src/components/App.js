import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";

import Login from "./login/Login";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import Editor from "./profile/Editor";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/:profile/edit" component={Editor} />
            <Route exact path="/:profile" component={Profile} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

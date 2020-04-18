import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register, login } from "../../actions/auth";

import Nav from "../layout/Nav";

import "./../../styles/login.scss";

class Login extends Component {
  state = {
    registration: {
      first: "",
      last: "",
      email: "",
      password: "",
      confirm: "",
    },
    login: {
      email: "",
      password: "",
    },
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSignUpSubmit = (e) => {
    e.preventDefault();
    if (this.state.registration.password !== this.state.registration.confirm) {
      console.log("passwords do not match");
      return;
    }
    console.log(this.state);
    const user = {
      username: this.state.registration.email,
      email: this.state.registration.email,
      password: this.state.registration.password,
      first_name: this.state.registration.first,
      last_name: this.state.registration.last,
    };
    this.props.register(user);
  };

  onLoginSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const user = {
      username: this.state.login.email,
      password: this.state.login.password,
    };
    this.props.login(user);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <Nav />
        <div className="container">
          <div className="row">
            <div className="column">
              <div className="signup">
                <h1>Sign Up</h1>
                <form onSubmit={this.onSignUpSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      value={this.state.registration.first}
                      onChange={(e) => {
                        this.setState({
                          registration: {
                            ...this.state.registration,
                            first: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      value={this.state.registration.last}
                      onChange={(e) => {
                        this.setState({
                          registration: {
                            ...this.state.registration,
                            last: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={this.state.registration.email}
                      onChange={(e) => {
                        this.setState({
                          registration: {
                            ...this.state.registration,
                            email: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={this.state.registration.password}
                      onChange={(e) => {
                        this.setState({
                          registration: {
                            ...this.state.registration,
                            password: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={this.state.registration.confirm}
                      onChange={(e) => {
                        this.setState({
                          registration: {
                            ...this.state.registration,
                            confirm: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input type="submit" value="Sign Up" />
                  </div>
                </form>
              </div>
            </div>

            <div className="column">
              <div className="login">
                <h1>Login</h1>
                <form onSubmit={this.onLoginSubmit}>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={this.state.login.email}
                      onChange={(e) => {
                        this.setState({
                          login: {
                            ...this.state.login,
                            email: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={this.state.login.password}
                      onChange={(e) => {
                        this.setState({
                          login: {
                            ...this.state.login,
                            password: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input type="submit" value="Login" />
                  </div>
                  <div>
                    <a href="#">Lost password?</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, login })(Login);

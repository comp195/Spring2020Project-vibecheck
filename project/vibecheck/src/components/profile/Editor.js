import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfile } from "../../actions/profiles";
import Nav from "../layout/Nav";

import "./../../styles/profile.scss";

class Editor extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    profile: this.props.profile,
    bgColor: "#eeeeee",
    accentColor: "#eb8f34",
    primaryColor: "#333333",
    secondaryColor: "#666666",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateProfile(this.state.profile);
    this.props.history.push(`/${this.state.profile.username}`);
    // TODO update auth user profile
    // TODO don't submit changes if there are none
  };

  componentDidMount() {
    let colors = this.state.profile.colors.split(",", 4);
    if (colors.length == 4) {
      this.setState({
        bgColor: colors[0],
        accentColor: colors[1],
        primaryColor: colors[2],
        secondaryColor: colors[3],
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Nav />
        <div className="profile-editor-container">
          <div className="row">
            <div className="column">
              <div className="heading">
                <h1>Edit Profile</h1>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="column label">Display Name</div>
                  <div className="column">
                    <input
                      type="text"
                      value={this.state.profile.display_name}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            display_name: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Description</div>
                  <div className="column">
                    <textarea
                      value={this.state.profile.description}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            description: e.target.value,
                          },
                        });
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Birthday</div>
                  <div className="column">
                    <input
                      type="date"
                      value={this.state.profile.birthday}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            birthday: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Location</div>
                  <div className="column">
                    <input
                      type="text"
                      value={this.state.profile.location}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            location: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Avatar URL</div>
                  <div className="column">
                    <input
                      type="text"
                      value={this.state.profile.avatar_url}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            avatar_url: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Spotify URI</div>
                  <div className="column">
                    <input
                      type="text"
                      value={this.state.profile.spotify_uri}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            spotify_uri: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Background Color</div>
                  <div className="column">
                    <input
                      className="color-input"
                      type="color"
                      value={this.state.bgColor}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            colors: `${e.target.value},${this.state.accentColor},${this.state.primaryColor},${this.state.secondaryColor}`,
                          },
                          bgColor: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="column">
                    <input
                      className="color-input"
                      type="text"
                      value={this.state.bgColor}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            colors: `${e.target.value},${this.state.accentColor},${this.state.primaryColor},${this.state.secondaryColor}`,
                          },
                          bgColor: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Accent Color</div>
                  <div className="column">
                    <input
                      className="color-input"
                      type="color"
                      value={this.state.accentColor}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            colors: `${this.state.bgColor},${e.target.value},${this.state.primaryColor},${this.state.secondaryColor}`,
                          },
                          accentColor: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="column">
                    <input
                      className="color-input"
                      type="text"
                      value={this.state.accentColor}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            colors: `${this.state.bgColor},${e.target.value},${this.state.primaryColor},${this.state.secondaryColor}`,
                          },
                          accentColor: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Primary Text Color</div>
                  <div className="column">
                    <input
                      className="color-input"
                      type="color"
                      value={this.state.primaryColor}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            colors: `${this.state.bgColor},${this.state.accentColor},${e.target.value},${this.state.secondaryColor}`,
                          },
                          primaryColor: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="column">
                    <input
                      className="color-input"
                      type="text"
                      value={this.state.primaryColor}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            colors: `${this.state.bgColor},${this.state.accentColor},${e.target.value},${this.state.secondaryColor}`,
                          },
                          primaryColor: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column label">Secondary Text Color</div>
                  <div className="column">
                    <input
                      className="color-input"
                      type="color"
                      value={this.state.secondaryColor}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            colors: `${this.state.bgColor},${this.state.accentColor},${this.state.primaryColor},${e.target.value}`,
                          },
                          secondaryColor: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="column">
                    <input
                      className="color-input"
                      type="text"
                      value={this.state.secondaryColor}
                      onChange={(e) => {
                        this.setState({
                          profile: {
                            ...this.state.profile,
                            colors: `${this.state.bgColor},${this.state.accentColor},${this.state.primaryColor},${e.target.value}`,
                          },
                          secondaryColor: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="column">
                    <button type="submit">Save Profile</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.auth.user.profile,
});

export default connect(mapStateToProps, { updateProfile })(withRouter(Editor));

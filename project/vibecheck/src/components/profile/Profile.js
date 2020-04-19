import React, { Component, Fragment } from "react";
import Nav from "../layout/Nav";
import Bio from "./Bio";
import Posts from "./Posts";
import Spotify from "./Playlist";

import "./../../styles/profile.scss";

class Profile extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <div className="profile-container">
          <div className="row">
            <div className="column">
              <Bio />
              <Spotify />
            </div>
            <div className="column">
              <Posts />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Profile;

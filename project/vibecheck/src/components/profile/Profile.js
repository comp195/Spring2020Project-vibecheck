import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/profiles";
import Nav from "../layout/Nav";
import Bio from "./Bio";
import Posts from "./Posts";
import Spotify from "./Playlist";

import "./../../styles/profile.scss";

class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
  };

  state = {
    style: {},
  };

  modifyColor = (col, amt) => {
    let usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  };

  setProfileStyle = (profile) => {
    if (
      !profile.colors ||
      profile.colors == "#eeeeee,#eb8f34,#333333,#666666"
    ) {
      return;
    }
    let colors = profile.colors.split(",", 4);
    if (colors.length != 4) {
      return;
    }
    let style = document.getElementById("profile-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "profile-style";
      document.head.appendChild(style);
    }
    style.innerHTML = `:root {
      --background-color: ${colors[0]};
      --accent-color: ${colors[1]};
      --primary-text-color: ${colors[2]};
      --secondary-text-color: ${colors[3]};
    }

    body {
      color: var(--primary-text-color);
      background-color: var(--background-color);
    }

    nav {
      background-color: var(--accent-color);
    }

    nav li a {
      color: var(--primary-text-color);
    }

    nav li a:hover {
      color: var(--background-color);
    }

    nav .brand svg g {
      fill: var(--primary-text-color);
    }

    div .profile-container div .profile-bio .username,
    div .profile-container div .post .post-name a .post-username,
    div .profile-container div .post .post-date {
      color: var(--secondary-text-color);
    }

    div .profile-container div .post .post-name a .post-display-name,
    div .profile-container div .search input[type="search"] {
      color: var(--primary-text-color);
    }

    div .profile-container div .profile-bio,
    div .profile-container div .posts,
    div .profile-container div .search {
      border-color: var(--primary-text-color);
    }

    div .profile-container div .post {
      border-color: var(--background-color);
    }

    div .profile-container div .post .mention,
    div .profile-container div .profile-bio .edit a,
    div .profile-container div .profile-bio .edit a:hover {
      color: var(--accent-color);
    }

    div .profile-container div .follow button, 
    div .profile-container div .unfollow button {
      color: var(--primary-text-color);
      background: var(--accent-color);
      border-color: var(--primary-text-color);
    }

    div .profile-container div .follow button:hover,
    div .profile-container div .unfollow button:hover {
      background: ${this.modifyColor("#F6D55C", -20)};
    }
    `;
  };

  componentWillUnmount() {
    let style = document.getElementById("profile-style");
    if (style) {
      style.remove();
    }
  }

  componentDidMount() {
    this.props.getProfile(this.props.match.params.profile);
  }

  componentDidUpdate(prevProps) {
    if (
      Object.keys(this.props.profile).length > 0 &&
      this.props.profile.username != this.props.match.params.profile
    ) {
      this.props.getProfile(this.props.match.params.profile);
    }
    let style = document.getElementById("profile-style");
    if (
      (!prevProps.profile && this.props.profile) ||
      prevProps.profile.colors != this.props.profile.colors ||
      (prevProps.profile.colors == this.props.profile.colors && !style)
    ) {
      this.setProfileStyle(this.props.profile);
    }
  }

  render() {
    if (Object.keys(this.props.profile).length === 0) {
      return (
        <Fragment>
          <Nav />
          <div>
            <h1>Loading...</h1>
          </div>
        </Fragment>
      );
    }
    document.title = `${this.props.profile.display_name} (@${this.props.profile.username}) - VibeCheck`;
    return (
      <Fragment>
        <Nav profile={this.props.profile} />
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

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);

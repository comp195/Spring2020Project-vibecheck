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

  componentDidMount() {
    this.props.getProfile(this.props.match.params.profile);
  }

  componentDidUpdate() {
    if (
      Object.keys(this.props.profile).length > 0 &&
      this.props.profile.username != this.props.match.params.profile
    ) {
      this.props.getProfile(this.props.match.params.profile);
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

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
});

export default connect(mapStateToProps, { getProfile })(Profile);

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile, setProfile } from "../../actions/profiles";
import Nav from "../layout/Nav";
import Bio from "./Bio";
import Posts from "./Posts";
import Spotify from "./Playlist";

import "./../../styles/profile.scss";

class Profile extends Component {
  static propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.match.params.profile) {
      this.props.getProfile(this.props.match.params.profile);
    } else if (this.props.user) {
      this.props.setProfile(this.props.user.profile);
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
  user: state.auth.user,
  profile: state.profiles.profile,
});

export default connect(mapStateToProps, { getProfile, setProfile })(Profile);

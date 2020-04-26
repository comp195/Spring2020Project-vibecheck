import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class SideNav extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="side-nav">
        <h2>Home</h2>
        <div className="side-nav-links">
          <ul>
            <li>
              <Link to={`/${this.props.profile.username}`}>
                <i className="fas fa-user"></i> Profile
              </Link>
            </li>
            <li>
              <i className="fas fa-envelope"></i> Messages
            </li>
            <li>
              <i className="fas fa-bookmark"></i> Saved
            </li>
            <li>
              <i className="fas fa-calendar-check"></i> Events
            </li>
          </ul>
          <div className="show-more">
            <a>Show More</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.auth.user.profile,
});

export default connect(mapStateToProps)(SideNav);

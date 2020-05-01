import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

class SideNav extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="side-nav">
        <h2>Home</h2>
        <div className="side-nav-links">
          <ul>
            <li>
              <Link to="/home">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to={`/${this.props.profile.username}`}>
                <i className="fas fa-user"></i> Profile
              </Link>
            </li>
            <li>
              <Link to={`/${this.props.profile.username}/edit`}>
                <i className="fas fa-cog"></i> Profile Editor
              </Link>
            </li>
            <li>
              <Link to="/" onClick={this.props.logout}>
                <i className="fas fa-sign-out-alt" /> Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.auth.user.profile,
});

export default connect(mapStateToProps, { logout })(SideNav);

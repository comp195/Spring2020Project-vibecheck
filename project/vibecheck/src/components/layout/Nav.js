import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import "./../../styles/nav.scss";

class Nav extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const authLinks = (
      <div className="icons">
        <ul>
          <li>
            <Link to="/profile">
              <i className="fas fa-user" />
            </Link>
          </li>
          <li>
            <Link to="/feed">
              <i className="fas fa-home" />
            </Link>
          </li>
          <li>
            <Link to="#logout">
              <i className="fas fa-sign-out-alt" onClick={this.props.logout} />
            </Link>
          </li>
        </ul>
      </div>
    );

    const guestLinks = <div></div>;

    return (
      <nav>
        <div className="brand">
          <Link to="/">
            <img src="/static/vibecheck/img/brand.png"></img>
          </Link>
        </div>
        {this.props.auth.isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Nav);

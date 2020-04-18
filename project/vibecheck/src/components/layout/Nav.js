import React, { Component } from "react";
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
            <i className="fas fa-envelope"></i>
          </li>
          <li>
            <i className="fas fa-bell"></i>
          </li>
          <li>
            <i className="fas fa-user"></i>
          </li>
          <li>
            <i className="fas fa-sign-out-alt" onClick={this.props.logout}></i>
          </li>
        </ul>
      </div>
    );

    const guestLinks = <div></div>;

    return (
      <nav>
        <div className="brand">
          <img src="./static/vibecheck/img/brand.png"></img>
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

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
            <Link
              to={
                this.props.auth.user
                  ? `/${this.props.auth.user.profile.username}`
                  : "/home"
              }
            >
              <i className="fas fa-user" />
            </Link>
          </li>
          <li>
            <Link to="/home">
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

    const guestLinks = (
      <div className="icons">
        <ul>
          <li>
            <Link to="/login">
              <i className="fas fa-sign-in-alt" />
            </Link>
          </li>
        </ul>
      </div>
    );

    return (
      <nav>
        <div className="brand">
          <Link to="/">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="100.000000pt"
              height="50.000000pt"
              viewBox="0 0 689.000000 274.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,274.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M1900 1735 l0 -995 135 0 135 0 0 59 0 59 88 -44 c113 -57 183 -74
307 -74 121 0 192 17 303 71 146 72 269 210 327 369 37 101 45 253 21 364 -29
128 -85 227 -185 327 -69 69 -104 94 -171 127 -89 43 -205 72 -287 72 -116 -1
-259 -42 -355 -101 l-48 -29 0 395 0 395 -135 0 -135 0 0 -995z m764 50 c110
-29 205 -107 263 -216 26 -50 28 -63 28 -164 0 -101 -2 -115 -29 -170 -124
-252 -444 -307 -641 -110 -72 72 -107 149 -113 247 -16 274 230 481 492 413z"
                />
                <path
                  d="M1495 2445 c-167 -60 -110 -310 67 -293 58 6 96 31 120 79 64 124
-56 262 -187 214z"
                />
                <path
                  d="M13 2058 c20 -53 642 -1318 647 -1318 6 0 117 223 496 998 l163 332
-153 0 -153 0 -176 -357 -176 -357 -170 348 c-94 192 -171 353 -171 357 0 5
-70 9 -156 9 -121 0 -155 -3 -151 -12z"
                />
                <path
                  d="M1417 2063 c-4 -3 -7 -303 -7 -665 l0 -658 135 0 135 0 0 665 0 665
-128 0 c-71 0 -132 -3 -135 -7z"
                />
                <path
                  d="M3874 2060 c-143 -26 -264 -92 -369 -201 -80 -84 -143 -196 -170
-304 -19 -76 -19 -222 0 -305 56 -236 257 -441 487 -495 82 -19 247 -19 323 0
81 20 210 86 265 134 l45 40 -94 94 -94 95 -47 -34 c-157 -112 -351 -104 -498
22 -41 35 -102 125 -102 152 0 9 108 12 509 12 l509 0 6 31 c11 56 6 182 -10
249 -53 227 -236 421 -459 490 -80 24 -224 34 -301 20z m257 -290 c71 -27 151
-97 189 -164 17 -28 30 -54 30 -58 0 -5 -164 -8 -365 -8 -248 0 -365 3 -365
10 0 38 78 134 149 182 101 70 241 85 362 38z"
                />
                <path
                  d="M6570 1160 c-315 -46 -492 -83 -940 -195 -498 -124 -644 -165 -1655
-461 -347 -101 -637 -184 -645 -184 -8 1 -82 59 -165 130 l-150 129 -268 1
c-147 0 -311 -5 -365 -10 -97 -11 -260 -46 -274 -59 -8 -7 551 -284 773 -383
247 -110 306 -128 412 -128 85 0 107 4 223 44 168 57 296 106 589 226 266 109
384 154 715 272 468 167 788 269 1725 553 176 53 322 99 324 101 8 8 -34 2
-299 -36z"
                />
              </g>
            </svg>
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

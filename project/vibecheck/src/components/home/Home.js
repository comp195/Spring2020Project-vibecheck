import React, { Component, Fragment } from "react";
import Nav from "../layout/Nav";
import SideNav from "./SideNav";
import Feed from "./Feed";
import Recommendations from "./Recommendations";
import Trends from "./Trends";

import "./../../styles/home.scss";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Nav />
        <div className="home-container">
          <div className="row">
            <div className="column">
              <SideNav />
            </div>
            <div className="column">
              <Feed />
            </div>
            <div className="column">
              <Recommendations />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;

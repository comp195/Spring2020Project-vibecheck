import React, { Component } from "react";

class Recommendations extends Component {
  render() {
    return (
      <div className="recommendations">
        <div className="title">Who to Follow</div>
        <div className="recommendation">
          <div className="profile">
            <i className="fas fa-user"></i> Username
          </div>
        </div>
        <div className="recommendation">
          <div className="profile">
            <i className="fas fa-user"></i> Username
          </div>
        </div>
        <div className="recommendation">
          <div className="profile">
            <i className="fas fa-user"></i> Username
          </div>
        </div>
        <div className="show-more">
          <a>Show More</a>
        </div>
      </div>
    );
  }
}

export default Recommendations;

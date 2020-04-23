import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Post from "../home/Post";

class Posts extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Fragment>
        <div className="search">
          <i className="fas fa-search"></i>
          <input type="search" />
        </div>
        <div className="posts">
          {this.props.profile.posts.map((post) => {
            post.profile = this.props.profile;
            return <Post post={post} />;
          })}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profiles.profile,
});

export default connect(mapStateToProps)(Posts);

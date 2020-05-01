import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Post from "../home/Post";

class Posts extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
  };

  state = {
    query: "",
  };

  render() {
    return (
      <Fragment>
        <div className="search">
          <i className="fas fa-search"></i>
          <input
            type="search"
            value={this.state.query}
            onChange={(e) => {
              this.setState({
                query: e.target.value,
              });
            }}
          />
        </div>
        <div className="posts">
          {this.props.profile.posts
            .sort((p1, p2) => {
              return new Date(p2.date) - new Date(p1.date);
            })
            .map((post) => {
              post.profile = this.props.profile;
              if (this.state.query && post.content) {
                if (
                  post.content
                    .toLowerCase()
                    .includes(this.state.query.toLowerCase())
                ) {
                  return <Post post={post} />;
                }
              } else if (!this.state.query) {
                return <Post post={post} />;
              }
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

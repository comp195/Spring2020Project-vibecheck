import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/posts";
import Form from "./Form";
import Post from "./Post";

class Feed extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };

  componentDidMount() {
    this.props.getPosts(this.props.user);
  }

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
        <div className="feed">
          <Form />
          {this.props.posts.map((post) => {
            if (this.state.query && post.content) {
              if (
                post.content
                  .toLowerCase()
                  .includes(this.state.query.toLowerCase()) ||
                post.profile.display_name
                  .toLowerCase()
                  .includes(this.state.query.toLowerCase()) ||
                post.profile.username
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
  user: state.auth.user,
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(Feed);

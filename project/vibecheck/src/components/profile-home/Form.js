import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../actions/posts";

class Form extends Component {
  state = {
    content: "",
  };

  static propTypes = {
    profile: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { content } = this.state;
    const post = {
      profile: this.props.profile.id,
      content: content,
    };
    this.props.addPost(post);
    this.setState({
      content: "",
    });
  };

  render() {
    const content = this.state.content;
    return (
      <div className="new-post">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="profile-picture column">
              <img src={this.props.profile.avatar_url} alt="avatar" />
            </div>
            <div className="column">
              <textarea
                placeholder="Vibing?"
                value={content}
                onChange={this.onChange}
              ></textarea>
            </div>
            <div className="row">
              <div className="multi-media column"></div>
              <div className="column">
                <button type="submit">
                  <i className="fas fa-check"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.auth.user.profile,
});

export default connect(mapStateToProps, { addPost })(Form);

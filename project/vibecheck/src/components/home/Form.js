import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../actions/posts";

class Form extends Component {
  state = {
    content: "",
    file: "",
    filename: "",
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

  onFileUpload = (e) => {
    let file = e.target.files[0];
    let name = file.name;
    if (name.length > 15) {
      name =
        name.substring(0, 7) +
        "... " +
        name.substring(name.lastIndexOf(".") - 4);
    }
    this.setState({
      file: file,
      filename: name,
    });
    e.target.value = "";
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { content, file } = this.state;
    if (!content && !file) {
      return;
    }
    const post = {
      profile: this.props.profile.id,
      content: content,
    };
    this.props.addPost(post, file);
    this.setState({
      content: "",
      file: "",
      filename: "",
    });
  };

  render() {
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
                value={this.state.content}
                onChange={this.onChange}
              ></textarea>
            </div>
            <div className="row">
              <div className="multi-media column">
                <label className="file-upload">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={this.onFileUpload}
                  />
                  <i className="fas fa-image"></i>
                  <span>{this.state.filename}</span>
                </label>
              </div>
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

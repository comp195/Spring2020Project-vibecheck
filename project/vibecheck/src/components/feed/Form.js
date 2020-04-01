import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPost } from "../../actions/posts";

class Form extends Component {
    state = {
        content: ""
    }

    static propTypes = {
        addPost: PropTypes.func.isRequired
    }

    onChange = e => {
        this.setState({
            content: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        const { content } = this.state;
        const post = {
            profile_id: 1,
            content: content
        }
        this.props.addPost(post);
        this.setState({
            content: ""
        });
    }

    render() {
        const content = this.state.content;
        return (
            <div className="new-post">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="profile-picture column">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="column">
                            <textarea placeholder="Vibing?" value={content} onChange={this.onChange}>
                            </textarea>
                        </div>
                        <div className="row">
                            <div className="multi-media column">
                                <ul>
                                    <li>
                                        <i className="fas fa-image"></i>
                                    </li>
                                </ul>
                            </div>
                            <div className="submit column">
                                <input type="submit" value="Check" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


export default connect(null, { addPost })(Form);
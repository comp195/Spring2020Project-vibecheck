import React, { Component } from "react";
import { render } from "react-dom";
import Post from "./Post";

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            post: {
                profile_id: 1,
                content: "",
            }
        };
    }

    componentDidMount() {
        fetch("api/posts/")
            .then(response => {
                return response.json();
            })
            .then(posts => {
                this.setState(() => {
                    return {
                        posts
                    };
                });
            });
    }

    handlePostSubmit = () => {
        fetch("api/posts/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.post)
        }).then(response => {
            return response.json();
        }).then(post => {
            this.setState({
                post: {
                    ...this.state.post,
                    content: ""
                },
                posts: this.state.posts.concat(post)
            })
        });
    }

    render() {
        return (
            <div className="feed">
                <div className="new-post">
                    <div className="row">
                        <div className="profile-picture column">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="column">
                            <textarea placeholder="Vibing?" value={this.state.post.content}
                                onChange={e => {
                                    this.setState({
                                        post: {
                                            ...this.state.post,
                                            content: e.target.value
                                        }
                                    })
                                }}>
                            </textarea>
                        </div>
                        <div className="row">
                            <div className="multi-media column">
                                <ul>
                                    <li>
                                        <i className="fas fa-image"></i>
                                    </li>
                                    <li>
                                        <i className="fas fa-video"></i>
                                    </li>
                                    <li>
                                        <i className="fas fa-poll"></i>
                                    </li>
                                </ul>
                            </div>
                            <div className="submit column">
                                <input type="button" value="Check" onClick={this.handlePostSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.posts.map(post => {
                    return (
                        <Post post={post} />
                    );
                })
                }
            </div>
        );
    }
}

export default Feed
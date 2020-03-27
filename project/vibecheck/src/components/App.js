import React, { Component } from "react";
import { render } from "react-dom";
import "./../styles/styles.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loaded: false,
      placeholder: "Loading",
      post: {
        profile_id: 1,
        content: "",
      }
    };
  }

  componentDidMount() {
    fetch("api/post/")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(posts => {
        this.setState(() => {
          return {
            posts,
            loaded: true
          };
        });
      });
  }

  handlePostSubmit = () => {
    fetch("api/post/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.post)
    }).then(response => {
      if (response.status > 400) {
        return this.setState(() => {
          return { placeholder: "Something went wrong!" };
        });
      }
      return response.json();
    }).then(post => {
      console.log(post);
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
                    <i className="fas fa-camera"></i>
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
            <div className="post">
              <div className="row">
                <div className="profile-picture column">
                  <img src={post.profile.avatar_url} alt="avatar" />
                </div>
                <div className="column">
                  {post.profile.display_name}
                  <br />{post.date}
                </div>
              </div>
              <div className="post-content">
                {post.content}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

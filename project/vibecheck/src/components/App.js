import React, { Component } from "react";
import { render } from "react-dom";
import "./../styles/styles.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
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
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      this.state.data.map(post => {
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
      })
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);

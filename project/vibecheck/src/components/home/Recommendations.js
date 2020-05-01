import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFollowRecommendations } from "../../actions/recommended";

class Recommendations extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    profiles: PropTypes.array.isRequired,
    getFollowRecommendations: PropTypes.func.isRequired,
  };

  shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  componentDidMount() {
    this.props.getFollowRecommendations();
  }

  render() {
    let profiles = [];
    this.props.profiles.forEach((profile) => {
      if (this.props.user.profile.username == profile.username) {
        return;
      }
      let isFriend = false;
      this.props.user.friends.forEach((friend) => {
        if (friend.profile.username == profile.username) {
          isFriend = true;
        }
      });
      if (!isFriend && profiles.length < 5) {
        profiles.push(profile);
      }
    });
    this.shuffle(profiles);

    return (
      <div className="recommendations">
        <div className="title">Who to Follow</div>
        {profiles.map((profile) => {
          return (
            <div className="recommendation">
              <div className="row profile">
                <img className="column" src={profile.avatar_url}></img>
                <div className="column">
                  <Link to={`/${profile.username}`}>
                    <div className="display-name">{profile.display_name}</div>
                    <div className="username">@{profile.username}</div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  profiles: state.recommended.profiles,
});

export default connect(mapStateToProps, { getFollowRecommendations })(
  Recommendations
);

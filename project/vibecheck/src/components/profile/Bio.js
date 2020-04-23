import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addFriend, removeFriend } from "../../actions/friends";

class Bio extends Component {
  static propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object.isRequired,
  };

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  formatJoinDate = (date) => {
    date = date.split("-");
    let year = date[0];
    let month = parseInt(date[1]) - 1;
    return `${this.months[month]} ${year}`;
  };

  formatBirthday = (date) => {
    date = date.split("-");
    let day = "";
    let month = parseInt(date[1]) - 1;
    let i = parseInt(date[2]);
    let j = i % 10;
    let k = i % 100;
    if (j == 1 && k != 11) {
      day = i + "st";
    } else if (j == 2 && k != 12) {
      day = i + "nd";
    } else if (j == 3 && k != 13) {
      day = i + "rd";
    } else {
      day = i + "th";
    }
    return `${this.months[month]} ${day}`;
  };

  isOwner = () => {
    return (
      this.props.user != null &&
      this.props.user.profile.id == this.props.profile.id
    );
  };

  isFollowing = () => {
    if (this.isOwner() || this.props.user == null) {
      return false;
    }
    let following = false;
    this.props.user.friends.forEach((friend) => {
      if (friend.profile.id == this.props.profile.id) {
        following = true;
        return;
      }
    });
    return following;
  };

  onFollow = () => {
    this.props.addFriend(this.props.user.id, this.props.profile.user);
  };

  onUnfollow = () => {
    this.props.user.friends.forEach((friend) => {
      if (friend.profile.id == this.props.profile.id) {
        this.props.removeFriend(friend);
        return;
      }
    });
  };

  render() {
    let profile = this.props.profile;
    let birthday = this.formatBirthday(profile.birthday);
    let joined = this.formatJoinDate(profile.join_date);

    let isOwner = this.isOwner();
    let isFollowing = this.isFollowing();
    let editProfile = (
      <div className="row edit">
        <Link to="/profile/edit">Edit Profile</Link>
      </div>
    );
    let followProfile = (
      <div className="row follow">
        <button onClick={this.onFollow}>Follow</button>
      </div>
    );
    let unfollowProfile = (
      <div className="row unfollow">
        <button onClick={this.onUnfollow}>
          <span>Following</span>
        </button>
      </div>
    );
    return (
      <div className="profile-bio">
        <div className="row avatar">
          <img src={profile.avatar_url} alt="avatar" />
        </div>
        <div className="row name">{profile.display_name}</div>
        {isOwner ? editProfile : isFollowing ? unfollowProfile : followProfile}
        <div className="row description">
          <div className="column">{profile.description}</div>
        </div>
        <div className="row birthday">
          <div className="column">Birthday</div>
          <div className="column">{birthday}</div>
        </div>
        <div className="row location">
          <div className="column">Location</div>
          <div className="column">{profile.location}</div>
        </div>
        <div className="row joined">
          <div className="column">Joined</div>
          <div className="column">{joined}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profiles.profile,
});

export default connect(mapStateToProps, { addFriend, removeFriend })(Bio);

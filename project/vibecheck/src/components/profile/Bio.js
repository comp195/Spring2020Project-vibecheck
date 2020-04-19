import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Bio extends Component {
  static propTypes = {
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

  formatJoinDate = (dateStr) => {
    let date = new Date(dateStr);
    return `${this.months[date.getMonth()]} ${date.getFullYear()}`;
  };

  formatBirthday = (dateStr) => {
    let date = new Date(dateStr);
    let day = "";
    let i = date.getDate();
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
    return `${this.months[date.getMonth()]} ${day}`;
  };

  render() {
    let birthday = this.formatBirthday(this.props.profile.birthday);
    let joined = this.formatJoinDate(this.props.profile.join_date);
    return (
      <div className="profile-bio">
        <div className="row avatar">
          <img src={this.props.profile.avatar_url} alt="avatar" />
        </div>
        <div className="row name">{this.props.profile.display_name}</div>
        <div className="row bio">
          <div className="column">Bio</div>
          <div className="column">{this.props.profile.description}</div>
        </div>
        <div className="row birthday">
          <div className="column">Birthday</div>
          <div className="column">{birthday}</div>
        </div>
        <div className="row location">
          <div className="column">Location</div>
          <div className="column">{this.props.profile.location}</div>
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
  profile: state.auth.user.profile,
});

export default connect(mapStateToProps)(Bio);

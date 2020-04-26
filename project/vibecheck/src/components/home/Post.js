import React from "react";
import { Link } from "react-router-dom";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formateDate = (dateStr) => {
  let date = new Date(dateStr);
  let diff = Date.now() - date.getTime();
  let seconds = (diff / 1000).toFixed(1);
  let minutes = (diff / (1000 * 60)).toFixed(1);
  let hours = (diff / (1000 * 60 * 60)).toFixed(1);
  if (seconds < 60) {
    return "Just Now";
  } else if (minutes < 60) {
    return Math.round(minutes) + "m";
  } else if (hours < 24) {
    return Math.round(hours) + "h";
  } else {
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }
};

const hyperlinkMentions = (content) => {
  return content.replace(/\B\@([\w\-]+)/gim, (match, username) => {
    return `<a class="mention" href="/${username}">${match}</a>`;
  });
};

const Post = (props) => {
  return (
    <div className="post">
      <div className="row">
        <div className="post-avatar column">
          <img src={props.post.profile.avatar_url} alt="avatar" />
        </div>
        <div className="column">
          <div className="post-name">
            <Link to={`/${props.post.profile.username}`}>
              <span className="post-display-name">
                {props.post.profile.display_name}
              </span>
              <span className="post-username">
                @{props.post.profile.username}
              </span>
            </Link>
          </div>
          <div className="post-date">{formateDate(props.post.date)}</div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: hyperlinkMentions(props.post.content),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Post;

import React from "react";

const Post = (props) => {
    return (
        <div className="post">
            <div className="row">
                <div className="post-avatar column">
                    <img src={props.post.profile.avatar_url} alt="avatar" />
                </div>
                <div className="column">
                    <div className="post-display-name">{props.post.profile.display_name}</div>
                    <div className="post-date">{props.post.date}</div>
                    <div className="post-content">
                        {props.post.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
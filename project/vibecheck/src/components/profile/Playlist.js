import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Spotify extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
  };

  render() {
    let uri = this.props.profile.spotify_uri;
    let src = "https://open.spotify.com/embed/playlist/2aGj6GfVPXZ0SLu7msU0D6";
    if (uri.includes("spotify:track:")) {
      src =
        "https://open.spotify.com/embed/track/" +
        uri.replace("spotify:track:", "");
    } else if (uri.includes("spotify:playlist:")) {
      src =
        "https://open.spotify.com/embed/playlist/" +
        uri.replace("spotify:playlist:", "");
    }
    return (
      <div className="profile-spotify">
        <iframe
          src={src}
          width="300"
          height="380"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.auth.user.profile,
});

export default connect(mapStateToProps)(Spotify);

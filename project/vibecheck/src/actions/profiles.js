import { GET_PROFILE, UPDATE_PROFILE } from "./types";

export const getProfile = (username) => (dispatch) => {
  fetch(`/api/profiles/${username}/`)
    .then((response) => {
      return response.json();
    })
    .then((profile) => {
      dispatch({
        type: GET_PROFILE,
        payload: profile,
      });
    })
    .catch((err) => console.log(err));
};

export const updateProfile = (profile) => (dispatch) => {
  delete profile.posts;
  fetch(`/api/profiles/${profile.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  })
    .then((response) => {
      return response.json();
    })
    .then((profile) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: profile,
      });
    })
    .catch((err) => console.log(err));
};

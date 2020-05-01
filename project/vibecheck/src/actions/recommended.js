import { GET_RECOMMENDED } from "./types";

export const getFollowRecommendations = () => (dispatch) => {
  fetch("/api/recommended/")
    .then((response) => {
      return response.json();
    })
    .then((profiles) => {
      dispatch({
        type: GET_RECOMMENDED,
        payload: profiles,
      });
    })
    .catch((err) => console.log(err));
};

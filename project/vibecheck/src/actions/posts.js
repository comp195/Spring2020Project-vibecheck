import { GET_POSTS, ADD_POST } from "./types";

export const getPosts = (user) => (dispatch) => {
  let posts = user.profile.posts;
  posts.forEach((post) => (post.profile = user.profile));
  user.friends.forEach((friend) =>
    friend.profile.posts.forEach((post) => {
      post.profile = friend.profile;
      posts.push(post);
    })
  );
  // TODO sort posts by date
  dispatch({
    type: GET_POSTS,
    payload: posts,
  });
};

export const addPost = (post) => (dispatch) => {
  fetch("/api/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      return response.json();
    })
    .then((post) => {
      dispatch({
        type: ADD_POST,
        payload: post,
      });
    })
    .catch((err) => console.log(err));
};

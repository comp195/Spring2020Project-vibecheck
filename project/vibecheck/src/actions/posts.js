import { GET_POSTS, ADD_POST } from "./types";

export const getPosts = (user) => (dispatch) => {
  let posts = user.profile.posts;
  posts.forEach((post) => (post.profile = user.profile));
  user.friends.forEach((friend) =>
    friend.profile.posts.forEach((post) => {
      post.profile = friend.profile;
      if (!posts.includes(post)) {
        posts.push(post);
      }
    })
  );
  posts.sort((p1, p2) => {
    return new Date(p2.date) - new Date(p1.date);
  });
  dispatch({
    type: GET_POSTS,
    payload: posts,
  });
};

export const addPost = (post, image = null) => (dispatch) => {
  const data = new FormData();
  data.append("image", image);
  data.append("data", JSON.stringify(post));
  fetch("/api/posts/", {
    method: "POST",
    body: data,
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

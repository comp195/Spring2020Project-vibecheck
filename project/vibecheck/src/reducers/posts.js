import {
  GET_POSTS,
  ADD_POST,
  ADD_FRIEND,
  DELETE_FRIEND,
} from "../actions/types";

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case ADD_FRIEND:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.profile.posts].sort(
          (p1, p2) => {
            return new Date(p2.date) - new Date(p1.date);
          }
        ),
      };
    case DELETE_FRIEND:
      let posts = state.posts
        .filter((post) => post.profile.id != action.payload.profile.id)
        .sort((p1, p2) => {
          return new Date(p2.date) - new Date(p1.date);
        });
      return {
        ...state,
        posts: posts,
      };
    default:
      return state;
  }
};

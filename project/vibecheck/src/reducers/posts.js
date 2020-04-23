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
        posts: [...state.posts, action.payload],
      };
    case ADD_FRIEND:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.profile.posts],
      };
    case DELETE_FRIEND:
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post.profile != action.payload.profile.id
        ),
      };
    default:
      return state;
  }
};

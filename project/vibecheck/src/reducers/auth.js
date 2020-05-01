import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_PROFILE,
  ADD_FRIEND,
  DELETE_FRIEND,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload,
        },
      };
    case ADD_FRIEND:
      return {
        ...state,
        user: {
          ...state.user,
          friends: [...state.user.friends, action.payload],
        },
      };
    case DELETE_FRIEND:
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            posts: state.user.profile.posts.filter(
              (post) => post.profile.id != action.payload.profile.id
            ),
          },
          friends: state.user.friends.filter(
            (friend) => friend.id != action.payload.id
          ),
        },
      };
    default:
      return state;
  }
}

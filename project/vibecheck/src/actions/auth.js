import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  fetch("/api/auth/user", {
    method: "GET",
    headers: getHeaders(getState),
  })
    .then((response) => {
      if (response.status == 401) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((user) => {
      dispatch({
        type: USER_LOADED,
        payload: user,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const login = ({ username, password }) => (dispatch) => {
  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      if (user.non_field_errors) {
        throw new Error(user.non_field_errors[0]);
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message,
      });
    });
};

export const register = ({ username, email, password, confirm }) => (
  dispatch
) => {
  if (password !== confirm) {
    dispatch({
      type: REGISTER_FAIL,
      payload: "Passwords Do Not Match",
    });
    return;
  }
  fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .then((user) => {
      if (Object.keys(user).length > 1) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: user,
        });
      } else {
        throw new Error(user[0]);
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.message,
      });
    });
};

export const logout = () => (dispatch, getState) => {
  fetch("/api/auth/logout", {
    method: "POST",
    headers: getHeaders(getState),
  })
    .then((response) => {
      if (response.status == 204) {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      } else throw new Error(response.statusText);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getHeaders = (getState) => {
  const token = getState().auth.token;
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  return headers;
};

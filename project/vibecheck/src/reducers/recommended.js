import { GET_RECOMMENDED } from "../actions/types";

const initialState = {
  profiles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RECOMMENDED:
      return {
        ...state,
        profiles: action.payload,
      };
    default:
      return state;
  }
};

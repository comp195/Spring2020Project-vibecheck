import { UPDATE_PROFILE } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      console.log(state);
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};

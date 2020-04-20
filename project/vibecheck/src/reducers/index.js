import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import profiles from "./profiles";

export default combineReducers({
  posts,
  auth,
  profiles,
});

import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import profiles from "./profiles";
import recommended from "./recommended";

export default combineReducers({
  posts,
  auth,
  profiles,
  recommended,
});

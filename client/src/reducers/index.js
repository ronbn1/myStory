import { combineReducers } from "redux";
import post from "./posts";
import user from "./user";
import alert from "./alert";

export default combineReducers({
  post,
  user,
  alert
});

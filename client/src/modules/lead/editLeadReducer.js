import leadReducer from "./leadReducer";
import { combineReducers } from "redux";

export default combineReducers({
  lead: leadReducer,
});

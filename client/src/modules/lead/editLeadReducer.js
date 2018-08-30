import leadReducer from "./leadReducer";
import { combineReducers } from "redux";
import { NOT_FOUND } from "./types";

const notFoundReducer = (state = false, action) => {
  if (action.type === NOT_FOUND){ 
    return action.payload
  }
  return state;
}

export default combineReducers({
  lead: leadReducer,
  notFound: notFoundReducer,
});

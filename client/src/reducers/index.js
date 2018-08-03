import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import leadReducer from "./leadReducer";

export default combineReducers({
  auth: authReducer,
  leads: leadReducer,
  errors: errorReducer
});

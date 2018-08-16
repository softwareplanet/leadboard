import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import leadReducer from "./leadReducer";
import organizationReducer from "./organizationReducer";

export default combineReducers({
  auth: authReducer,
  leads: leadReducer,
  errors: errorReducer,
  organizations: organizationReducer
});

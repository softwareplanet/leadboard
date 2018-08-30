import leadReducer from "./leadReducer";
import { combineReducers } from "redux";
import activityReducer from "./EditLead/Activities/activityReducer";

export default combineReducers({
  lead: leadReducer,
  activities: activityReducer
});

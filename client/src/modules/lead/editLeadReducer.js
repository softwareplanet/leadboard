import activityReducer from "./EditLead/Activities/activityReducer";
import leadReducer from "./leadReducer";
import { combineReducers } from "redux";

export default combineReducers({
  lead: leadReducer,
  activities: activityReducer,
});

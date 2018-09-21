import leadReducer from "./leadReducer";
import { combineReducers } from "redux";
import activityReducer from "../../modules/lead/EditLead/Activities/activityReducer";

import { LEAD_NOT_FOUND, LOAD_LEAD } from "./types";
import noteReducer from "./EditLead/EditLeadContent/EditLeadHistory/Notes/noteReducer";

const notFoundReducer = (state = false, action) => {
  switch (action.type) {
    case LEAD_NOT_FOUND:
      return true;
    case LOAD_LEAD:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  lead: leadReducer,
  activities: activityReducer,
  notFound: notFoundReducer,
  notes: noteReducer,
});

import leadReducer from "./leadReducer";
import { combineReducers } from "redux";
import activityReducer from "../../modules/lead/EditLead/Activities/activityReducer";
import noteReducer from "./EditLead/EditLeadContent/EditLeadHistory/Notes/noteReducer";
import { LEAD_NOT_FOUND, LOAD_LEAD, LOAD_STAGES_FOR_FUNNELS } from "./types";

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

const stagesForFunnelsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_STAGES_FOR_FUNNELS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  lead: leadReducer,
  activities: activityReducer,
  notFound: notFoundReducer,
  notes: noteReducer,
  stagesForFunnel: stagesForFunnelsReducer,
});

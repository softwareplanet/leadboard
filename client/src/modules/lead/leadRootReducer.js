import funnelReducer from "./funnelReducer";
import stageReducer from "./stageReducer";
import leadsReducer from "./leadsReducer";
import editLeadReducer from "./editLeadReducer";
import { combineReducers } from "redux";
import { LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN } from "./EditLead/Activities/types";

export const replacementReducer = (type, initialState) => (state = initialState, action) => {
  switch (action.type) {
    case type:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  funnels: funnelReducer,
  stages: stageReducer,
  leads: leadsReducer,
  editLead: editLeadReducer,
  activities: replacementReducer(LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN, []),
});

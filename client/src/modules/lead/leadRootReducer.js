import funnelReducer from "./funnelReducer";
import loadingReducer from "./loadingReducer";
import stageReducer from "./stageReducer";
import leadsReducer from "./leadsReducer";
import editLeadReducer from "./editLeadReducer";
import { combineReducers } from "redux";
import { LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN } from "./EditLead/Activities/types";
import activeFunnelReducer from "./activeFunnelReducer";

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
  loading: loadingReducer,
  activeFunnel: activeFunnelReducer,
  stages: stageReducer,
  leads: leadsReducer,
  editLead: editLeadReducer,
  activities: replacementReducer(LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN, []),
});

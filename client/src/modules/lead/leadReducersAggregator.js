import funnelReducer from "./funnelReducer";
import stageReducer from "./stageReducer";
import leadsReducer from "./leadsReducer";
import editLeadReducer from "./editLeadReducer";
import { combineReducers } from "redux";

export default combineReducers({
  funnels: funnelReducer,
  stages: stageReducer,
  leads: leadsReducer,
  editLead: editLeadReducer,
});

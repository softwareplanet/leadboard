import funnelReducer from "./funnelReducer";
import loadingReducer from "./loadingReducer";
import stageReducer from "./stageReducer";
import leadsReducer from "./leadsReducer";
import editLeadReducer from "./editLeadReducer";
import { combineReducers } from "redux";
import { LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN } from "./EditLead/Activities/types";
import activeFunnelReducer from "./activeFunnelReducer";
import { SET_DASHBOARD_FUNNELS_FILTER, SET_ACTIVE_FILTER, ADD_DASHBOARD_FUNNELS_FILTER } from "./types";
import { IN_PROGRESS } from "../../constants";

export const replacementReducer = (type, initialState) => (state = initialState, action) => {
  switch (action.type) {
    case type:
      return action.payload;
    default:
      return state;
  }
};

const dashboardFiltersReducer = (filters = [], action) => {
  switch (action.type) {
    case SET_DASHBOARD_FUNNELS_FILTER: {
      let newFilters = [...filters]
      for (let filter of newFilters) {
        if (filter.funnelId === action.payload.funnelId) {
          filter.status = action.payload.status;
        }
      }
      return newFilters;
    }
    case ADD_DASHBOARD_FUNNELS_FILTER: {
      let newFilters = [...filters]
      newFilters.push(action.payload)
      return newFilters;
    }
    default:
      return filters;
  }
}

export default combineReducers({
  funnels: funnelReducer,
  loading: loadingReducer,
  activeFunnel: activeFunnelReducer,
  stages: stageReducer,
  leads: leadsReducer,
  editLead: editLeadReducer,
  activities: replacementReducer(LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN, []),
  dashboardFilters: dashboardFiltersReducer,
});

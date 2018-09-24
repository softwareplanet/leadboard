import { LOAD_ORGANIZATIONS, ADD_ORGANIZATION, LOAD_ORGANIZATION } from "./types";
import activityReducer from "../../../lead/EditLead/Activities/activityReducer";
import { combineReducers } from "redux";

const organizationReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ORGANIZATION:
      return action.payload;
    default:
      return state;
  }
};

const organizationsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORGANIZATIONS:
      return action.payload;
    case ADD_ORGANIZATION:
      let newOrganizations = [...state];
      newOrganizations.push(action.payload);
      return newOrganizations;
    case LOAD_ORGANIZATION:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  organizations: organizationsReducer,
  detailedOrganization: organizationReducer,
  notes: [],
  activities: activityReducer,
});

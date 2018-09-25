import { LOAD_ORGANIZATIONS, ADD_ORGANIZATION, LOAD_ORGANIZATION } from "./types";
import detailedOrganizationReducer from  "../../../detailedView/Organization/detailedOrganizationReducer";
import { combineReducers } from "redux";

const organizationsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORGANIZATIONS:
      return action.payload;
    case ADD_ORGANIZATION:
      let newOrganizations = [...state];
      newOrganizations.push(action.payload);
      return newOrganizations;
    default:
      return state;
  }
};

export default combineReducers({
  organizations: organizationsReducer,
  detailedOrganization: detailedOrganizationReducer,
});

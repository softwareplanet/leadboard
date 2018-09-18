import { combineReducers } from "redux";
import authReducer from "./modules/auth/authReducer";
import leadReducersAggregator from "./modules/lead/leadRootReducer";

import { GET_ERRORS, CLEAR_STORE } from "./actionTypes";
import contactReducer from "./modules/layouts/Contacts/People/contactReducer";
import organizationReducer from "./modules/layouts/Contacts/Organizations/organizationReducer";
import settingReducer from "./modules/settings/settingReducer";
import searchReducer from "./modules/layouts/Navbar/searchReducer";
import domainReducer from "./modules/settings/domain/domainReducer";

const initialState = {};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  auth: authReducer,
  leads: leadReducersAggregator,
  errors: errorReducer,
  contacts: contactReducer,
  organizations: organizationReducer,
  settings: settingReducer,
  search: searchReducer,
  domain: domainReducer,
  settings: settingReducer,
});

export default function rootReducer(state, action) {
  switch (action.type) {
    case CLEAR_STORE:
      return appReducer(undefined, action);
    default:
      return appReducer(state, action);
  }
}

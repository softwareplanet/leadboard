import { combineReducers } from "redux";
import authReducer from "./modules/auth/authReducer";
import leadReducersAggregator from "./modules/lead/leadRootReducer";

import { GET_ERRORS, CLEAR_STORE } from "./actionTypes";
import contactReducer from "./modules/common/autocomplete/contact/contactReducer";
import organizationReducer from "./modules/common/autocomplete/organization/organizationReducer";
<<<<<<< HEAD
import settingReducer from "./modules/settings/settingReducer";
=======
import domainReducer from "./modules/settings/domain/domainReducer";
>>>>>>> 9bc1faafbbd7cf9f042a3c27c9b4cfd963fbe8c1

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
<<<<<<< HEAD
  settings: settingReducer,
=======
  domain: domainReducer,
>>>>>>> 9bc1faafbbd7cf9f042a3c27c9b4cfd963fbe8c1
});

export default function rootReducer(state, action) {
  switch (action.type) {
    case CLEAR_STORE:
      return appReducer(undefined, action);
    default:
      return appReducer(state, action);
  }
}

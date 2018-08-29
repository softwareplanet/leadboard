import { combineReducers } from "redux";
import authReducer from "./modules/auth/authReducer";
import leadReducer from "./modules/lead/leadReducer";
import contactReducer from "./modules/common/autocomplete/contact/contactReducer";
import organizationReducer from "./modules/common/autocomplete/organization/organizationReducer";
import { GET_ERRORS } from "./actionTypes";

const initialState = {};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  auth: authReducer,
  leads: leadReducer,
  errors: errorReducer,
  contacts: contactReducer,
  organizations: organizationReducer
});
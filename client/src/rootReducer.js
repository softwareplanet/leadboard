import { combineReducers } from "redux";
import authReducer from "./modules/auth/authReducer";
import leadReducersAggregator from "./modules/lead/leadReducersAggregator";
import contactReducer from "./modules/lead/AddLead/autocomplete/contact/contactReducer";
import organizationReducer from "./modules/lead/AddLead/autocomplete/organization/organizationReducer";
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
  leads: leadReducersAggregator,
  errors: errorReducer,
  contacts: contactReducer,
  organizations: organizationReducer,
});

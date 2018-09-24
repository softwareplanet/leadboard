import { LOAD_CONTACTS, LOAD_CONTACT } from "./types";
import { combineReducers } from "redux";
import activityReducer from "../../../lead/EditLead/Activities/activityReducer";

const contactsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CONTACTS:
      return action.payload;
    default:
      return state;
  }
}

const contactReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CONTACT:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  contacts: contactsReducer,
  detailedContact: combineReducers({
    notes: [],
    activities: activityReducer,
    contact: contactReducer,
  })
})
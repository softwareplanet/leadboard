import { ADD_CONTACT, LOAD_CONTACTS } from "./types";
import { combineReducers } from "redux";
import activityReducer from "../../../lead/EditLead/Activities/activityReducer";
import detailedContactReducer from "../../../detailedView/Contact/detailedContactReducer";

const contactsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CONTACTS:
      return action.payload;
    case ADD_CONTACT:
      let newContacts = [...state];
      newContacts.push(action.payload);
      return newContacts;
    default:
      return state;
  }
}

export default combineReducers({
  contacts: contactsReducer,
  detailedContact: detailedContactReducer,
})

import { LOAD_CONTACTS } from "./types";
import { combineReducers } from "redux";
import detailedContactReducer from "../../../detailedView/Contact/detailedContactReducer";

const contactsReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_CONTACTS:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  contacts: contactsReducer,
  detailedContact: detailedContactReducer,
})

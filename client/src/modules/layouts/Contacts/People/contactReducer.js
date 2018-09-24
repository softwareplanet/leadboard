import { ADD_CONTACT, LOAD_CONTACTS } from "./types";
const initialState = [];

export default function(state = initialState, action) {
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

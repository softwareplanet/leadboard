import {
  LOAD_LEAD,
  UPDATE_CONTACT,
  UPDATE_LEAD,
  UPDATE_ORGANIZATION,
} from "./types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEAD:
      return action.payload;
    case UPDATE_LEAD:
      return action.payload;
    case UPDATE_ORGANIZATION:
      let updatedLead = { ...state };
      updatedLead.organization = action.payload;
      return updatedLead;
    case UPDATE_CONTACT:
      let leadWithUpdatedContact = { ...state };
      leadWithUpdatedContact.contact = action.payload;
      return leadWithUpdatedContact;
    default:
      return state;
  }
}

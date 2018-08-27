import { LOAD_CONTACTS } from "./types";
const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONTACTS:
      return action.payload;
    default:
      return state;
  }
}
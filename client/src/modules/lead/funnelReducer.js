import { LOAD_DASHBOARD } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD:
      return action.payload;
    default:
      return state;
  }
}
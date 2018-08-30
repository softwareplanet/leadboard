import { LOAD_STAGES } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_STAGES:
      return action.payload;
    default:
      return state;
  }
}

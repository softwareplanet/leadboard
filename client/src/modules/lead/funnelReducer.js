import { LOAD_LEADBOARD } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEADBOARD:
      return action.payload;
    default:
      return state;
  }
}
import { LOAD_FUNNELS } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_FUNNELS:
      return action.payload;
    default:
      return state;
  }
}
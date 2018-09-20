import { LOAD_DASHBOARD, LOAD_FUNNELS } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_DASHBOARD:
      return action.payload;
    case LOAD_FUNNELS:
      return action.payload;
    default:
      return state;
  }
}
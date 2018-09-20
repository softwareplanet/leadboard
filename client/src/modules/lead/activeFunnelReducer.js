import { SET_ACTIVE_FUNNEL } from "./types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_FUNNEL:
      return action.payload;
    default:
      return state;
  }
}
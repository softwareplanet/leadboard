import { LOAD_LEAD_ACTIVITIES } from "./types";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_LEAD_ACTIVITIES:
      return action.payload;
    default:
      return state;
  }
}

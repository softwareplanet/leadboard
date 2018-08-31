import {
  CREATE_ACTIVITY,
  LOAD_LEAD_ACTIVITIES
} from "./types";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_LEAD_ACTIVITIES:
      return action.payload;
    case CREATE_ACTIVITY:
      return [...state, action.payload];
    default:
      return state;
  }
}

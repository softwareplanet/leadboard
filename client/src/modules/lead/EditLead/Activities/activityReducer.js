import {
  CREATE_ACTIVITY,
} from "./types";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ACTIVITY:
      return [...state, action.payload];
    default:
      return state;
  }
}

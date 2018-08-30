import {
  CREATE_ACTIVITY,
} from "./types";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ACTIVITY:
      let activities = [];
      activities.push(action.payload);
      return [...state,...activities];
    default:
      return state;
  }
}

import { LOAD_LEAD_ACTIVITIES, UPDATE_ACTIVITY } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEAD_ACTIVITIES:
      return action.payload;
    case UPDATE_ACTIVITY:
      let newState = [...state];
      let oldActivity = newState.find(activity => activity._id === action.payload._id);
      newState.splice(newState.indexOf(oldActivity), 1, action.payload);
      return newState;
    default:
      return state;
  }
}

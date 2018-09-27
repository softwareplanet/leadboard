import {
  CREATE_ACTIVITY, DELETE_ACTIVITY,
  LOAD_ACTIVITIES,
  UPDATE_ACTIVITY,
} from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITIES:
      return action.payload;
    case CREATE_ACTIVITY:
      return [...state, action.payload];
    case UPDATE_ACTIVITY:
      let newState = [...state];
      let oldActivity = newState.find(activity => activity._id === action.payload._id);
      newState.splice(newState.indexOf(oldActivity), 1, action.payload);
      return newState;
    case DELETE_ACTIVITY:
      let stateWithoutDeletedActivity = [...state];
      const activityIndex = stateWithoutDeletedActivity.indexOf(action.payload);
      stateWithoutDeletedActivity.splice(activityIndex, 1);
      return stateWithoutDeletedActivity;
    default:
      return state;
  }
}

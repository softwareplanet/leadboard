import {
  CREATE_ACTIVITY,
} from "./types";

const initialState = {
  activities: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ACTIVITY:
      let activities = { ...state.activities };
      activities.push(action.payload);
      return {
        ...state,
        activities: activities,
      };
    default:
      return state;
  }
}

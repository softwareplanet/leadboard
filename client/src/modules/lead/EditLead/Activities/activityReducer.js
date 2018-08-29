import { LOAD_LEAD_ACTIVITIES, LOAD_ACTIVITY, UPDATE_ACTIVITY_STATUS } from "./types";

const initialState = {
  activities: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEAD_ACTIVITIES:
      return {
        ...state,
        editLeadActivities: action.payload,
      };
    default:
      return state;
  }
}
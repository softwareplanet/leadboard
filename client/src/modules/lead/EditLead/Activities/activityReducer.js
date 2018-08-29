import { LOAD_LEAD_ACTIVITIES } from "./types";

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
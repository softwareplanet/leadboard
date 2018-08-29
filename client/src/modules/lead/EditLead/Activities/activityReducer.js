import { LOAD_LEADS_ACTIVITIES } from "./types";

const initialState = {
  editLeadActivities: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEADS_ACTIVITIES:
      return {
        editLeadActivities: action.payload,
      };
    default:
      return state;
  }
}
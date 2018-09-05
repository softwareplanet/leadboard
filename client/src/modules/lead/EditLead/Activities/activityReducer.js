import {
  CREATE_ACTIVITY,
  LOAD_LEAD_ACTIVITIES,
  UPDATE_ACTIVITY,
  LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN,
} from "./types";

const initialState = {
  allActivities: [],
  leadActivities: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_LEAD_ACTIVITIES:
      let activities = { ...state };
      activities.leadActivities = action.payload;
      return activities;
    case CREATE_ACTIVITY:
      let leadWithNewActivity = { ...state };
      leadWithNewActivity.leadActivities.push(action.payload);
      return leadWithNewActivity;
    case UPDATE_ACTIVITY:
      let leadWithUpdatedActivity = { ...state };
      let leadActivities = leadWithUpdatedActivity.leadActivities;
      let oldActivity = leadActivities.find(activity => activity._id === action.payload._id);
      leadActivities.splice(leadActivities.indexOf(oldActivity), 1, action.payload);
      return leadWithUpdatedActivity;
    case LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN:
      let allActivities = { ...state };
      allActivities.allActivities = action.payload;
      return allActivities;
    default:
      return state;
  }
}

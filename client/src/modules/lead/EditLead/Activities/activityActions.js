import axios from "axios";
import { LOAD_LEAD_ACTIVITIES, LOAD_ACTIVITY, UPDATE_ACTIVITY_STATUS } from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

//load activities by lead Id
export const loadLeadActivities = leadId => dispatch => {
  axios
    .get(`api/activity/${leadId}`)
    .then(result => {
      dispatch(loadLeadActivitiesAction(result.data));
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    });
};

export function loadLeadActivitiesAction(data) {
  return {
    type: LOAD_LEAD_ACTIVITIES,
    payload: data,
  };
}

export function getErrorsAction(errors) {
  return {
    type: GET_ERRORS,
    payload: errors,
  };
}

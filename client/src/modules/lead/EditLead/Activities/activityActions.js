import axios from "axios";
import { LOAD_LEAD_ACTIVITIES, UPDATE_ACTIVITY } from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

//load activities by lead Id
export const loadLeadActivities = leadId => dispatch => {
  axios
    .get(`/api/lead/${leadId}/activities`)
    .then(result => {
      dispatch(loadLeadActivitiesAction(result.data));
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    });
};

//update activity by id
export const updateActivity = (activity) => dispatch => {
  axios
    .patch(`/api/activity`, activity)
    .then(res => {
      dispatch(updateActivityAction(res.data));
    })
    .catch(error => {
      dispatch(getErrorsAction(error));
    });
};

export function loadLeadActivitiesAction(data) {
  return {
    type: LOAD_LEAD_ACTIVITIES,
    payload: data,
  };
}

export function updateActivityAction(data) {
  return {
    type: UPDATE_ACTIVITY,
    payload: data,
  };
}

export function getErrorsAction(errors) {
  return {
    type: GET_ERRORS,
    payload: errors,
  };
}

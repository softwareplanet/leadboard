import axios from "axios";
import {
  LOAD_LEAD_ACTIVITIES,
  CREATE_ACTIVITY
} from "./types";
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

// Create activity
export const createActivity = (data) => dispatch => {
  axios
    .post(`/api/activity`, data)
    .then(res => {
      dispatch(createActivityAction(res.data));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

export function createActivityAction(data) {
  return {
    type: CREATE_ACTIVITY,
    payload: data,
  };
}

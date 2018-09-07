import axios from "axios";
import {
  LOAD_LEAD_ACTIVITIES,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY, DELETE_ACTIVITY,
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

//update activity by id
export const updateActivity = (activity) => dispatch => {
  axios
    .patch(`/api/activity/${activity._id}`, activity)
    .then(res => {
      dispatch(updateActivityAction(res.data));
    })
    .catch(error => {
      dispatch(getErrorsAction(error));
    });
};

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

// Delete activity by id
export const deleteActivity = (activity) => dispatch => {
  axios
    .delete(`/api/activity/${activity._id}`)
    .then(() => {
      dispatch(deleteActivityAction(activity));
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

export function createActivityAction(data) {
  return {
    type: CREATE_ACTIVITY,
    payload: data,

  };
}

export function deleteActivityAction(data) {
  return {
    type: DELETE_ACTIVITY,
    payload: data,
  };
}

import axios from "axios";
import {
  LOAD_ACTIVITIES,
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN,
  DELETE_ACTIVITY,
} from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

//load all activities by domain
export const loadFirstActivityInLeadsPlan = () => dispatch => {
  axios.
    get(`/api/activity/firstInLeadPlan`)
    .then(result => {
      dispatch(loadFirstActivityAction(result.data))
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    })
};

//load activities by modelName and model id
export const loadActivities = (modelName, modelId) => dispatch => {
  axios
    .get(`/api/activity/?${modelName}=${modelId}`)
    .then(result => {
      dispatch(loadActivitiesAction(result.data));
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
export const createActivity = (data, modelName, modelId) => dispatch => {
  axios
    .post(`/api/activity`, data)
    .then(res => {
      dispatch(loadActivities(modelName, modelId));
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

export function loadActivitiesAction(data) {
  return {
    type: LOAD_ACTIVITIES,
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

export function loadFirstActivityAction(data) {
  return {
    type: LOAD_FIRST_ACTIVITY_IN_LEAD_PLAN,
    payload: data,
  };
}

export function deleteActivityAction(data) {
  return {
    type: DELETE_ACTIVITY,
    payload: data,
  };
}

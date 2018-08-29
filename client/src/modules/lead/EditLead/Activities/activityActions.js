import axios from "axios";
import { LOAD_LEADS_ACTIVITIES } from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

//load activities by lead Id
export const loadLeadsActivities = leadId => dispatch => {
  axios
    .get(`api/activity/${leadId}`)
    .then(result => {
      dispatch(loadLeadsActivitiesAction(result.data));
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    });
};

export function loadLeadsActivitiesAction(data) {
  return {
    type: LOAD_LEADS_ACTIVITIES,
    payload: data,
  };
}

export function getErrorsAction(errors) {
  return {
    type: GET_ERRORS,
    payload: errors,
  };
}
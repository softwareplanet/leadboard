import axios from "axios";
import {
  CREATE_ACTIVITY,
} from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

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

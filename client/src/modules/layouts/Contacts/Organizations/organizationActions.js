import axios from "axios";
import { ADD_ORGANIZATION } from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

export const addOrganization = (organization) => (dispatch) => {
  axios
    .post(`/api/organization`, organization)
    .then(result => {
      dispatch({
        payload: result.data,
        type: ADD_ORGANIZATION,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

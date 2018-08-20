import axios from "axios";
import { LOAD_ORGANIZATIONS } from "./types";
import { GET_ERRORS } from "../../../../../actionTypes";

export const loadOrganizations = domain => dispatch => {
  axios.get("/api/organization", {
      params: {
        domain
      }
    })
    .then(result => dispatch({
      type: LOAD_ORGANIZATIONS,
      payload: result.data.data
    }))
    .catch(error => dispatch({
        type: GET_ERRORS,
        payload: error
    }));
};

import axios from "axios";
import { LOAD_ORGANIZATIONS } from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

export const loadOrganizations = () => dispatch => {
  axios.get("/api/organization")
    .then(...dispatchResponse(dispatch, LOAD_ORGANIZATIONS))
};

export const loadAggregatedOrganizations = () => dispatch => {
  axios.get("/api/organization/aggregated/")
    .then(...dispatchResponse(dispatch,LOAD_ORGANIZATIONS))
};

const dispatchResponse = (dispatch, actionType) => {
  return [
    (result) => dispatch({
      type: actionType,
      payload: result.data,
    }),
    (error) => dispatch({
      type: GET_ERRORS,
      payload: error,
    }),
  ];
};
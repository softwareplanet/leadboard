import axios from "axios";
import { LOAD_CONTACTS } from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

export const loadContacts = () => dispatch => {
  axios.get("/api/contact")
    .then(...dispatchResponse(dispatch, LOAD_CONTACTS));
};

export const loadAggregatedContacts = () => dispatch => {
  axios.get("/api/contact/aggregated/")
    .then(...dispatchResponse(dispatch, LOAD_CONTACTS));
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




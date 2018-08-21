import axios from "axios";
import { LOAD_CONTACTS } from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

export const loadContacts = domain => dispatch => {
  axios.get("/api/contact", {
    params: {
      domain,
    },
  })
    .then(result => dispatch({
      type: LOAD_CONTACTS,
      payload: result.data.data,
    }))
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error,
    }));
};
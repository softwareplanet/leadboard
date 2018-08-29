import axios from "axios";
import { LOAD_CONTACTS } from "./types";
import { GET_ERRORS } from "../../../../actionTypes";

export const loadContacts = () => dispatch => {
  axios.get("/api/contact")
    .then(result => dispatch({
      type: LOAD_CONTACTS,
      payload: result.data,
    }))
    .catch(error => dispatch({
      type: GET_ERRORS,
      payload: error,
    }));
};
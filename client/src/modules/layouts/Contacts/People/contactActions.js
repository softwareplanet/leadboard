import axios from "axios";
import { LOAD_CONTACTS } from "./types";
import { dispatchResponse } from "../../../../dispatchResponse";

export const loadContacts = () => dispatch => {
  axios.get("/api/contact")
    .then(...dispatchResponse(LOAD_CONTACTS));
};

export const loadAggregatedContacts = () => dispatch => {
  axios.get("/api/contact/aggregated/")
    .then(...dispatchResponse(LOAD_CONTACTS));
};

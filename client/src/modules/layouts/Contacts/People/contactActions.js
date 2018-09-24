import axios from "axios";
import { LOAD_CONTACTS, LOAD_CONTACT } from "./types";
import { dispatchResponse } from "../../../../dispatchResponse";

export const loadContacts = () => dispatch => {
  axios.get("/api/contact")
    .then(...dispatchResponse(LOAD_CONTACTS));
};

export const loadAggregatedContacts = () => dispatch => {
  axios.get("/api/contact/aggregated/")
    .then(...dispatchResponse(LOAD_CONTACTS));
};

export const loadContactById = (contactId) => dispatch => {
  axios.get(`/api/contact/${contactId}`)
    .then(...dispatchResponse(LOAD_CONTACT));
}

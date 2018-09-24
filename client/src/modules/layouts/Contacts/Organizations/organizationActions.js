import axios from "axios";
import { ADD_ORGANIZATION, LOAD_ORGANIZATIONS, LOAD_ORGANIZATION } from "./types";
import { dispatchResponse } from "../../../../dispatchResponse";

export const loadOrganizations = () => dispatch => {
  axios.get("/api/organization")
    .then(...dispatchResponse(LOAD_ORGANIZATIONS));
};

export const loadAggregatedOrganizations = () => dispatch => {
  axios.get("/api/organization/aggregated/")
    .then(...dispatchResponse(LOAD_ORGANIZATIONS));
};

export const addOrganization = organization => dispatch => {
  axios.post(`/api/organization`, organization)
    .then(...dispatchResponse(ADD_ORGANIZATION));
};

export const loadOrganization = organizationId => dispatch => {
  axios.get(`/api/organization/${organizationId}`)
    .then(...dispatchResponse(LOAD_ORGANIZATION));
};

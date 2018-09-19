import axios from "axios";
import { LOAD_ORGANIZATIONS } from "./types";
import { dispatchResponse } from "../../../../dispatchResponse";

export const loadOrganizations = () => {
  axios.get("/api/organization")
    .then(...dispatchResponse(LOAD_ORGANIZATIONS));
};

export const loadAggregatedOrganizations = () => {
  axios.get("/api/organization/aggregated/")
    .then(...dispatchResponse(LOAD_ORGANIZATIONS));
};

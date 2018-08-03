import axios from "axios";
import { LOAD_LEADBOARD, LOAD_STAGES, LOAD_LEADS, GET_ERRORS } from "./types";

// Load leadboard
export const loadLeadboard = domain => dispatch => {
  axios
    .get("/api/funnel", {
      params: {
        domain
      }
    })
    .then(result => {
      dispatch({
        type: LOAD_LEADBOARD,
        payload: result.data.data
      });

      if (typeof result.data.data[0]._id === "string") {
        dispatch(loadStages(result.data.data[0]._id, domain));
      }
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

export const loadStages = (funnel, domain) => dispatch => {
  axios
    .get("/api/stage", {
      params: {
        funnel,
        domain
      }
    })
    .then(result => {
      dispatch({
        type: LOAD_STAGES,
        payload: result.data.data
      });

      // check it!
      for (let i = 0; i < Object.keys(result.data.data).length; i++) {
        //if (typeof result.data.data[0]._id === "string") {
        dispatch(loadLeads(domain, result.data.data[i]._id));
        //}
      }
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

export const loadLeads = (domain, stage) => dispatch => {
  axios
    .get("/api/lead", {
      params: {
        domain,
        stage
      }
    })
    .then(result => {
      dispatch({
        type: LOAD_LEADS,
        stage: stage,
        payload: result.data.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

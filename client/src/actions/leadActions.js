import axios from "axios";
import { LOAD_LEADBOARD, LOAD_STAGES, LOAD_LEADS, GET_ERRORS } from "./types";

// Load leadboard by Domain ID
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

      if (result.data.data.length > 0) {
        if (typeof result.data.data[0]._id === "string") {
          dispatch(loadStages(result.data.data[0]._id));
        }
      }
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

// Load Stages by Funnel ID
export const loadStages = funnel => dispatch => {
  axios
    .get("/api/stage", {
      params: {
        funnel
      }
    })
    .then(result => {
      dispatch({
        type: LOAD_STAGES,
        payload: result.data.data
      });

      for (let i = 0; i < Object.keys(result.data.data).length; i++) {
        dispatch(loadLeads(result.data.data[i]._id));
      }
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

// Load leads by Stage ID
export const loadLeads = stage => dispatch => {
  axios
    .get("/api/lead", {
      params: {
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

// Create a new lead
export const createLead = lead => (dispatch, getState) => {
  return axios
    .post("/api/lead", lead)
    .then(response => {
      dispatch(loadLeadboard(getState().auth.domainid));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

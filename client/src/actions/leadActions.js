import axios from "axios";
import {
  LOAD_LEADBOARD,
  LOAD_STAGES,
  LOAD_LEADS,
  GET_ERRORS,
  LOAD_LEAD,
  UPDATE_LEAD,
  SET_EDIT_FUNNEL_ID
} from "./types";

// Load leadboard by Domain ID
export const loadLeadboard = domain => dispatch => {
  axios
    .get("/api/funnel", {
      params: {
        domain
      }
    })
    .then(result => {
      dispatch(loadLeadboardAction(result.data.data));
      if (typeof result.data.data[0]._id === "string") {
        dispatch(loadStages(result.data.data[0]._id));
      }
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
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
      dispatch(loadStagesAction(result.data.data));

      for (let i = 0; i < Object.keys(result.data.data).length; i++) {
        dispatch(loadLeads(result.data.data[i]._id));
      }
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
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
      dispatch(loadLeadsAction(stage, result.data.data));
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
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
      dispatch(getErrorsAction(error.response.data.errors));
    });
};

// Load lead by id
export const loadLead = (leadId, funnelId) => dispatch => {
  axios
    .get(`/api/lead/${leadId}`)
    .then(res => {
      dispatch({
        type: LOAD_LEAD,
        payload: res.data.lead
      });
      dispatch(loadStages(funnelId));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

// Update lead by id
export const updateLead = (lead, funnelId) => dispatch => {
  axios
    .patch(`/api/lead/${lead._id}`, lead)
    .then(res => {
      dispatch({
        type: UPDATE_LEAD,
        payload: res.data.lead
      });
      dispatch(loadLead(lead._id, funnelId));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};

// Set edit page funnel
export const setEditPageFunnel = funnelId => {
  return {
    type: SET_EDIT_FUNNEL_ID,
    payload: funnelId
  };
};

export function loadLeadboardAction(data) {
  return {
    type: LOAD_LEADBOARD,
    payload: data
  };
}

export function getErrorsAction(errors) {
  return {
    type: GET_ERRORS,
    payload: errors
  };
}

export function loadStagesAction(data) {
  return {
    type: LOAD_STAGES,
    payload: data
  };
}

export function loadLeadsAction(stage, data) {
  return {
    type: LOAD_LEADS,
    stage: stage,
    payload: data
  };
}

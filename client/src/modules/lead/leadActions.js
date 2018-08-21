import axios from "axios";

import {
  LOAD_LEADBOARD,
  LOAD_STAGES,
  LOAD_LEADS,
  LOAD_LEAD,
  UPDATE_LEAD,
  SET_EDIT_FUNNEL_ID, UPDATE_ORGANIZATION,
} from "./types";
import { GET_ERRORS } from "../../actionTypes";

// Load leadboard by Domain ID
export const loadLeadboard = domain => dispatch => {
  axios
    .get("/api/funnel", {
      params: {
        domain
      }
    })
    .then(result => {
      dispatch(loadLeadboardAction(result.data));
      if (typeof result.data[0]._id === "string") {
        dispatch(loadStages(result.data[0]._id));
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
      dispatch(loadStagesAction(result.data));
      for (let i = 0; i < Object.keys(result.data).length; i++) {
        dispatch(loadLeads(result.data[i]._id));
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
      dispatch(loadLeadsAction(stage, result.data));
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
export const loadLead = leadId => dispatch => {
  axios
    .get(`/api/lead/${leadId}`)
    .then(res => {
      let lead = res.data;
      dispatch({
        type: LOAD_LEAD,
        payload: lead
      });

      dispatch(loadStages(lead.stage.funnel));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

// Update lead by id
export const updateLead = lead => dispatch => {
  axios
    .patch(`/api/lead/${lead._id}`, lead)
    .then(res => {
      dispatch({
        type: UPDATE_LEAD,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};

export const updateOrganization = organization => dispatch => {
  const organizationId = organization._id;
  delete organization._id;
  axios
    .patch(`/api/organization/${organizationId}`, organization)
    .then(res => {
      dispatch({
        type: UPDATE_ORGANIZATION,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
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

import axios from "axios";
import {
  LOAD_LEAD,
  LOAD_DASHBOARD,
  LOAD_LEADS,
  LOAD_STAGES,
  UPDATE_CONTACT,
  UPDATE_LEAD,
  UPDATE_ORGANIZATION,
  DASHBOARD_LOADING,
  LEAD_NOT_FOUND,
  SET_ACTIVE_FUNNEL,
  LOAD_FUNNELS,
} from "./types";
import { GET_ERRORS } from "../../actionTypes";
import { IN_PROGRESS } from "../../constants";
import history from "../../history";

// set active funnel 
export const setActiveFunnel = (funnelId) => (dispatch) => {
  dispatch(dashboardLoadingAction(true));
  axios
    .get("/api/funnel")
    .then(result => {
      dispatch(loadFunnelsAction(result.data));
      const funnel = result.data.find(funnel => funnel._id === funnelId) || result.data[0];
      dispatch(setActiveFunnelAction(funnel));
      dispatch(loadDashboard(funnel._id))
      localStorage.setItem("activeFunnelId", funnel._id);
      if (history) history.push(`/pipelines/${funnel._id}`);
    })
}

// Load leadboard by funnel ID
export const loadDashboard = (funnelId, status = IN_PROGRESS) => dispatch => {
  axios
    .get(`/api/funnel/${funnelId}`)
    .then(result => {
      dispatch(loadStages(result.data._id, status));
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    });
};

// Load Stages by Funnel ID
export const loadStages = (funnel, status) => dispatch => {
  axios
    .get("/api/stage", {
      params: {
        funnel,
      },
    })
    .then(result => {
      dispatch(loadStagesAction(result.data));
      for (let i = 0; i < Object.keys(result.data).length; i++) {
        dispatch(loadLeads(result.data[i]._id, status));
      }
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    });
};

// Load leads by Stage ID
export const loadLeads = (stage, status) => dispatch => {
  axios
    .get("/api/lead", {
      params: {
        stage,
        status,
      },
    })
    .then(result => {
      dispatch(loadLeadsAction(stage, result.data));
      dispatch(dashboardLoadingAction(false))
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    });
};

// Create a new lead
export const createLead = lead => dispatch => {
  return axios
    .post("/api/lead", lead)
    .then(() => {
      dispatch(loadDashboard(localStorage.getItem("activeFunnelId"), lead.status));
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
        payload: lead,
      });
      dispatch(loadStages(lead.stage.funnel));
    })
    .catch(error => {
      if (error.response.status === 404) {
        dispatch(leadNotFound());
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data.errors,
        });
      }
    });
};

// Update lead by id
export const updateLead = lead => dispatch => {
  let updatedLead = { ...lead };
  if ("notes" in updatedLead) {
    console.warn("You cannot update notes using updateLead() - use [create|update|delete]Note() instead");
    delete updatedLead.notes;
  }

  axios
    .patch(`/api/lead/${lead._id}`, updatedLead)
    .then(res => {
      dispatch({
        type: UPDATE_LEAD,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

// Delete lead by id
export const deleteLead = leadId => dispatch => {
  axios
    .delete(`/api/lead/${leadId}`)
    .then(() => {
      history.replace("/home");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

//Update organization by id
export const updateOrganization = organization => dispatch => {
  let organizationCopy = { ...organization };
  const organizationId = organizationCopy._id;
  delete organizationCopy._id;
  axios
    .patch(`/api/organization/${organizationId}`, organizationCopy)
    .then(res => {
      dispatch({
        type: UPDATE_ORGANIZATION,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

//Update contact by id
export const updateContact = contact => dispatch => {
  let contactCopy = { ...contact };
  const contactId = contactCopy._id;
  delete contactCopy._id;
  axios
    .patch(`/api/contact/${contactId}`, contactCopy)
    .then(res => {
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

// Create note for lead
export const createNote = (leadId, note) => dispatch => {
  axios
    .post(`/api/lead/${leadId}/notes`, note)
    .then(res => {
      dispatch({
        type: UPDATE_LEAD,
        payload: res.data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

// Update lead's note
export const updateNote = (leadId, note) => dispatch => {
  axios
    .patch(`/api/lead/${leadId}/note/${note._id}`, note)
    .then(() => {
      dispatch(loadLead(leadId));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

// Delete lead's note
export const deleteNote = (leadId, noteId) => dispatch => {
  axios
    .delete(`/api/lead/${leadId}/note/${noteId}`)
    .then(() => {
      dispatch(loadLead(leadId));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error,
      });
    });
};

// Load funnels by authorized user's domain id
export const loadFunnels = () => dispatch => {
  axios
    .get("/api/funnel")
    .then(result => {
      dispatch(loadFunnelsAction(result.data));
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    });
};

export function loadFunnelsAction(data) {
  return {
    type: LOAD_FUNNELS,
    payload: data,
  };
}

export const leadNotFound = () => {
  return {
    type: LEAD_NOT_FOUND,
  };
}

export function loadDashboardAction(data) {
  return {
    type: LOAD_DASHBOARD,
    payload: data,
  };
}

export function getErrorsAction(errors) {
  return {
    type: GET_ERRORS,
    payload: errors,
  };
}

export function loadStagesAction(data) {
  return {
    type: LOAD_STAGES,
    payload: data,
  };
}

export function loadLeadsAction(stage, data) {
  return {
    type: LOAD_LEADS,
    stage,
    payload: data,
  };
}

export function dashboardLoadingAction(data) {
  return {
    type: DASHBOARD_LOADING,
    payload: data,
  };
}

export function setActiveFunnelAction(data) {
  return {
    type: SET_ACTIVE_FUNNEL,
    payload: data,
  };
}

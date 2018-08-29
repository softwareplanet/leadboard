import {
  LOAD_LEAD,
  LOAD_LEADBOARD,
  LOAD_LEADS,
  LOAD_STAGES,
  UPDATE_CONTACT,
  UPDATE_LEAD,
  UPDATE_ORGANIZATION,
  CLEAR_LEADS,
} from "./types";

const initialState = {
  funnels: [],
  stages: [],
  leads: {},
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEADBOARD:
      return {
        ...state,
        funnels: action.payload,
      };
    case LOAD_STAGES:
      return {
        ...state,
        stages: action.payload,
      };
    case LOAD_LEADS:
      let leads = Object.assign({}, state.leads);
      leads["_" + action.stage] = { leads: action.payload };
      return {
        ...state,
        leads: leads,
      };

    case LOAD_LEAD:
      return {
        ...state,
        editLead: action.payload,
      };
    case UPDATE_LEAD:
      return {
        ...state,
        editLead: action.payload,
      };
    case UPDATE_ORGANIZATION:
      let updatedLead = { ...state.editLead };
      updatedLead.organization = action.payload;
      return {
        ...state,
        editLead: updatedLead,
      };
    case UPDATE_CONTACT:
      let leadWithUpdatedContact = { ...state.editLead };
      leadWithUpdatedContact.contact = action.payload;
      return {
        ...state,
        editLead: leadWithUpdatedContact,
      };
    case CLEAR_LEADS:
      return {
        ...initialState
      }
    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import Action from '../../../models/Action';
import Contact from '../../../models/Contact';
import User from '../../../models/User';
import activityReducer from '../../lead/EditLead/Activities/activityReducer';
import noteReducer from '../../lead/EditLead/EditLeadContent/EditLeadHistory/Notes/noteReducer';
import { UPDATE_ORGANIZATION } from '../Organization/types';
import { LOAD_CONTACT, UPDATE_CONTACT } from './types';

const owner: User = {
  _id: '',
  domain: '',
  email: '',
  firstname: '',
  lastname: '',
  timestamp: new Date(),
};

const initialState: Contact = {
  _id: '',
  custom: [],
  domain: '',
  name: '',
  organization: {
    _id: '',
    custom: [],
    domain: ',',
    name: '',
    owner,
    timestamp: new Date(),
  },
  owner,
  timestamp: new Date(),
};

const contactReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_CONTACT:
      return action.payload;
    case UPDATE_CONTACT:
      return action.payload;
    case UPDATE_ORGANIZATION:
      const updatedContactWithOrganization = { ...state};
      updatedContactWithOrganization.organization = action.payload;
      return updatedContactWithOrganization;
    default:
      return state;
  }
};

export default combineReducers({
  activities: activityReducer,
  contact: contactReducer,
  notes: noteReducer,
});

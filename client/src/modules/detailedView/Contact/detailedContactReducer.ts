import { combineReducers } from 'redux';
import Action from '../../../models/Action';
import Contact from '../../../models/Contact';
import Domain from '../../../models/Domain';
import activityReducer from '../../lead/EditLead/Activities/activityReducer';
import { LOAD_CONTACT,UPDATE_CONTACT } from './types';

const domain: Domain = {
  _id: '',
  name: '',
  settings: {
    customFields: [],
    timezone: '',
  },
  timestamp: new Date(),
};

const initialState: Contact = {
  _id: '',
  custom: [],
  domain,
  name: '',
  organization: {
    _id: '',
    custom: [],
    domain: ',',
    name: '',
    timestamp: new Date(),
  },
  timestamp: new Date(),
};

const contactReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_CONTACT:
      return action.payload;
    case UPDATE_CONTACT:
      let updatedContact = { ...state};
      updatedContact = action.payload;
      return updatedContact;
    default:
      return state;
  }
};

export default combineReducers({
  activities: activityReducer,
  contact: contactReducer,
});

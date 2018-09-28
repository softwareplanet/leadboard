import { combineReducers } from 'redux';
import Action from '../../../models/Action';
import Organization from '../../../models/Organization';
import User from '../../../models/User';
import replacementReducer from '../../../replacementReducer';
import activityReducer from '../../lead/EditLead/Activities/activityReducer';
import noteReducer from '../../lead/EditLead/EditLeadContent/EditLeadHistory/Notes/noteReducer';
import { LOAD_CONTACTS_FOR_ORGANIZATION, LOAD_ORGANIZATION, UPDATE_ORGANIZATION } from './types';

const owner: User = {
  _id: '',
  domain: '',
  email: '',
  firstname: '',
  lastname: '',
  timestamp: new Date(),
};

const initialState: Organization = {
  _id: '',
  custom: [],
  domain: '',
  name: '',
  owner,
  timestamp: new Date(),
};

const detailedOrganizationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_ORGANIZATION:
      return action.payload;
    case UPDATE_ORGANIZATION:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  activities: activityReducer,
  contacts: replacementReducer(LOAD_CONTACTS_FOR_ORGANIZATION, []),
  notes: noteReducer,
  organization: detailedOrganizationReducer,
});

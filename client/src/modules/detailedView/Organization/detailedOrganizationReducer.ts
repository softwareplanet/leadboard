import { combineReducers } from 'redux';
import Action from '../../../models/Action';
import activityReducer from '../../lead/EditLead/Activities/activityReducer';
import { LOAD_CONTACTS_FOR_ORGANIZATION, LOAD_ORGANIZATION } from './types';

const detailedOrganizationReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case LOAD_ORGANIZATION:
      return action.payload;
    default:
      return state;
  }
};

const organizationsContactsReducer = (state = [], action: Action) => {
  switch (action.type) {
    case LOAD_CONTACTS_FOR_ORGANIZATION:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  activities: activityReducer,
  contacts: organizationsContactsReducer,
  organization: detailedOrganizationReducer,
});

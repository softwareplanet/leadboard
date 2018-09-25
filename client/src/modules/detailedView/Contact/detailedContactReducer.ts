import { combineReducers } from 'redux';
import Action from '../../../models/Action';
import activityReducer from '../../lead/EditLead/Activities/activityReducer';
import noteReducer from '../../lead/EditLead/EditLeadContent/EditLeadHistory/Notes/noteReducer';
import { LOAD_CONTACT } from './types';

const contactReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case LOAD_CONTACT:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  activities: activityReducer,
  contact: contactReducer,
  notes: noteReducer,
});

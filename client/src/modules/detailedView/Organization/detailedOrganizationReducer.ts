import { combineReducers } from 'redux';
import Action from '../../../models/Action';
import activityReducer from '../../lead/EditLead/Activities/activityReducer';
import noteReducer from '../../lead/EditLead/EditLeadContent/EditLeadHistory/Notes/noteReducer';
import { LOAD_ORGANIZATION } from './types';

const detailedOrganizationReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case LOAD_ORGANIZATION:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  activities: activityReducer,
  notes: noteReducer,
  organization: detailedOrganizationReducer,
});

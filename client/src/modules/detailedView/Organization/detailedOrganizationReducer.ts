import { combineReducers } from 'redux';
import activityReducer from '../../lead/EditLead/Activities/activityReducer';
import { LOAD_ORGANIZATION } from './types';

interface Action {
  type: string;
  payload: any;
}

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
  organization: detailedOrganizationReducer,
});

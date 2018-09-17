import Domain from '../../../models/Domain';
import { LOAD_DOMAIN } from './types';

interface Action {
  type: string;
  payload: any;
}

const initialState: Domain = {
  _id: '',
  name: '',
  settings: {
    customFields: [],
    timezone: '',
  },
  timestamp: new Date(),
};

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_DOMAIN:
      return action.payload;
    default:
      return state;
  }
}

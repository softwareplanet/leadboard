import { LOAD_SETTINGS } from './modules/lead/Dashboard/types';

interface Action {
  type: string,
  payload: any;
}

export default function(initialState = [], action: Action) {
  switch (action.type) {
    case LOAD_SETTINGS:
      return action.payload;
    default:
      return initialState;
  }
}

import Action from '../../../models/Action';
import { LOAD_USERS } from './types';

export default function(state = [], action: Action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.payload;
    default:
      return state;
  }
}

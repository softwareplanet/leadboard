import Note from '../../../../../../models/Note';
import { UPDATE_ACTIVITY } from '../../../Activities/types';
import { CREATE_NOTE, DELETE_NOTE, LOAD_NOTES, UPDATE_NOTE } from './types';

interface Action {
  type: string;
  payload: any;
}

const initialState: Note[] = [];

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case CREATE_NOTE:
      return [...state, action.payload];
    case LOAD_NOTES:
      return action.payload;
    case DELETE_NOTE:
    case UPDATE_ACTIVITY:
      const newState = [...state];
      const oldNote = newState.find((note: Note) => note._id === action.payload._id);
      if (oldNote) {
        newState.splice(newState.indexOf(oldNote), 1, action.payload);
      }
      return newState;
    case UPDATE_NOTE:
      const stateWithoutDeletedNote = [...state];
      const activityIndex = stateWithoutDeletedNote.indexOf(action.payload);
      stateWithoutDeletedNote.splice(activityIndex, 1);
      return stateWithoutDeletedNote;
    default:
      return state;
  }
}

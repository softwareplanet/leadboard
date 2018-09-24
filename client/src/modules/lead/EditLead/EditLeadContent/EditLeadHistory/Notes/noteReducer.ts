import Note from '../../../../../../models/Note';
import { CREATE_NOTE, DELETE_NOTE, LOAD_NOTES, UPDATE_NOTE } from './types';

interface Action {
  type: string;
  payload: any;
}

const initialNotes: Note[] = [];

export default function(notes = initialNotes, action: Action) {
  switch (action.type) {
    case CREATE_NOTE:
      return [...notes, action.payload];
    case LOAD_NOTES:
      return action.payload;
    case UPDATE_NOTE:
      const newState = [...notes];
      const oldNote = newState.find((note: Note) => note._id === action.payload._id);
      if (oldNote) {
        newState.splice(newState.indexOf(oldNote), 1, action.payload);
      }
      return newState;
    case DELETE_NOTE:
      const stateWithoutDeletedNote = [...notes];
      const activityIndex = stateWithoutDeletedNote.indexOf(action.payload);
      stateWithoutDeletedNote.splice(activityIndex, 1);
      return stateWithoutDeletedNote;
    default:
      return notes;
  }
}

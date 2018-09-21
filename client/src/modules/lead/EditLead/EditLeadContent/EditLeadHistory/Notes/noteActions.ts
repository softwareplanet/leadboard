import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_ERRORS } from '../../../../../../actionTypes';
import Note from '../../../../../../models/Note';
import { CREATE_NOTE, DELETE_NOTE, LOAD_NOTES, UPDATE_NOTE } from './types';

export const loadNotes = (modelName: string, modelId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/note/${modelName}/${modelId}`)
    .then(result => {
      dispatch(loadNotesAction(result.data));
    })
    .catch(errors => {
      dispatch(getErrorsAction(errors));
    });
};

export const deleteNote = (note: Note) => (dispatch: Dispatch) => {
  axios
    .delete(`/api/note/${note._id}`)
    .then(() => {
      dispatch(deleteNoteAction(note));
    })
    .catch(errors => {
      dispatch(getErrorsAction(errors));
    });
};

export const updateNote = (note: Note) => (dispatch: Dispatch) => {
  axios
    .patch(`/api/note/${note._id}`, { text:note.text })
    .then(result => {
      dispatch(updateNoteAction(result.data));
    })
    .catch(errors => {
      dispatch(getErrorsAction(errors));
    });
};

export const createNote = (note: Note) => (dispatch: Dispatch) => {
  axios
    .post(`/api/note`, note)
    .then(result => {
      dispatch(createNoteAction(result.data));
    })
    .catch(errors => {
      dispatch(getErrorsAction(errors));
    });
};

export function getErrorsAction(errors: any) {
  return {
    payload: errors,
    type: GET_ERRORS,
  };
}

export function loadNotesAction(notes: Note[]) {
  return {
    payload: notes,
    type: LOAD_NOTES,
  };
}

export function deleteNoteAction(note: Note) {
  return {
    payload: note,
    type: DELETE_NOTE,
  };
}

export function updateNoteAction(note: Note) {
  return {
    payload: note,
    type: UPDATE_NOTE,
  };
}

export function createNoteAction(note: Note) {
  return {
    payload: note,
    type: CREATE_NOTE,
  };
}
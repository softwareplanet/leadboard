import axios from 'axios';
import { dispatchResponse } from '../../../../../../dispatchResponse';
import Note from '../../../../../../models/Note';
import { CREATE_NOTE, DELETE_NOTE, LOAD_NOTES, UPDATE_NOTE } from './types';

export const loadNotes = (modelName: string, modelId: string) => (dispatch: any) => {
  axios
    .get(`/api/note/${modelName}/${modelId}`)
    .then(...dispatchResponse(LOAD_NOTES));
};

export const deleteNote = (note: Note) => (dispatch: any) => {
  axios
    .delete(`/api/note/${note._id}`)
    .then(dispatch(deleteNoteAction(note)));
};

export const updateNote = (note: Note) => (dispatch: any) => {
  axios
    .patch(`/api/note/${note._id}`, { text: note.text })
    .then(...dispatchResponse(UPDATE_NOTE));
};

export const createNote = (note: Note) => (dispatch: any) => {
  axios
    .post(`/api/note`, note)
    .then(...dispatchResponse(CREATE_NOTE));
};

const deleteNoteAction = (data: Note) => {
  return {
    payload: data,
    type: DELETE_NOTE,
  };
};

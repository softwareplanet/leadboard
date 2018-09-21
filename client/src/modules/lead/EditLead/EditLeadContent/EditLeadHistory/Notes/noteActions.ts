import axios from 'axios';
import { Dispatch } from 'redux';
import { dispatchResponse } from '../../../../../../dispatchResponse';
import Note from '../../../../../../models/Note';
import { CREATE_NOTE, DELETE_NOTE, LOAD_NOTES, UPDATE_NOTE } from './types';

export const loadNotes = (modelName: string, modelId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/note/${modelName}/${modelId}`)
    .then(...dispatchResponse(LOAD_NOTES));
};

export const deleteNote = (note: Note) => (dispatch: Dispatch) => {
  axios
    .delete(`/api/note/${note._id}`)
    .then(...dispatchResponse(DELETE_NOTE));
};

export const updateNote = (note: Note) => (dispatch: Dispatch) => {
  axios
    .patch(`/api/note/${note._id}`, { text: note.text })
    .then(...dispatchResponse(UPDATE_NOTE));
};

export const createNote = (note: Note) => (dispatch: Dispatch) => {
  axios
    .post(`/api/note`, note)
    .then(...dispatchResponse(CREATE_NOTE));
};

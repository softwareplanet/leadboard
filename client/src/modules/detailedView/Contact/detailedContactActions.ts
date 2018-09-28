import axios from 'axios';
import { dispatchResponse } from '../../../dispatchResponse';
import { LOAD_CONTACT, UPDATE_CONTACT } from './types';

export const loadContact = (contactId: string) => (dispatch: any) => {
  axios.get(`/api/contact/${contactId}`)
    .then(...dispatchResponse(LOAD_CONTACT));
};

export const updateContact = (contact: any) => (dispatch: any) => {
  const contactCopy = { ...contact };
  const contactId = contactCopy._id;
  delete contactCopy._id;
  axios.patch(`/api/contact/${contactId}`, contactCopy)
    .then(...dispatchResponse(UPDATE_CONTACT));
};

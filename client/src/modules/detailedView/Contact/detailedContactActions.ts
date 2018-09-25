import axios from 'axios';
import { dispatchResponse } from '../../../dispatchResponse';
import { LOAD_CONTACT } from './types';

export const loadContact = (contactId: string) => (dispatch: any) => {
  axios.get(`/api/contact/${contactId}`)
    .then(...dispatchResponse(LOAD_CONTACT));
};

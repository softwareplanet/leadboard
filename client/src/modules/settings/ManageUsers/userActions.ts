import axios from 'axios';
import { Dispatch } from 'redux';
import { dispatchResponse } from '../../../dispatchResponse';
import {LOAD_USERS} from './types';

export const loadUsers = () => (dispatch: Dispatch) => {
  axios
    .get(`/api/user`)
    .then(...dispatchResponse(LOAD_USERS));
};

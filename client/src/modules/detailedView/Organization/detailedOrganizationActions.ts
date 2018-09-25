import axios from 'axios';
import { Dispatch } from 'redux';
import { dispatchResponse } from '../../../dispatchResponse';
import { LOAD_CONTACTS_FOR_ORGANIZATION, LOAD_ORGANIZATION } from './types';

export const loadOrganization = (organizationId: string) => (dispatch: Dispatch) => {
  axios.get(`/api/organization/${organizationId}`)
    .then(...dispatchResponse(LOAD_ORGANIZATION));
};

export const loadContactsForOrganization = (organizationId: string) => (dispatch: Dispatch) => {
  axios.get(`/api/organization/${organizationId}/contacts`)
    .then(...dispatchResponse(LOAD_CONTACTS_FOR_ORGANIZATION));
};

import axios from 'axios';
import { Dispatch } from 'redux';
import { dispatchResponse } from '../../../dispatchResponse';
import { LOAD_ORGANIZATION } from './types';

export const loadOrganization = (organizationId: string) => (dispatch: Dispatch) => {
  axios.get(`/api/organization/${organizationId}`)
    .then(...dispatchResponse(LOAD_ORGANIZATION));
};

export const updateOrganization = (organization: any) => (dispatch: Dispatch) => {
  axios.patch(`/api/organization/${organization._id}`, organization)
    .then(...dispatchResponse(LOAD_ORGANIZATION));
};

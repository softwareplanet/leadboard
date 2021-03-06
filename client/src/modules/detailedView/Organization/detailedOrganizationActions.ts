import axios from 'axios';
import { Dispatch } from 'redux';
import { dispatchResponse } from '../../../dispatchResponse';
import { LOAD_CONTACTS_FOR_ORGANIZATION, LOAD_ORGANIZATION, UPDATE_ORGANIZATION } from './types';

export const loadOrganization = (organizationId: string) => (dispatch: Dispatch) => {
  axios.get(`/api/organization/${organizationId}`)
    .then(...dispatchResponse(LOAD_ORGANIZATION));
};

export const loadAggregatedContactsForOrganization = (organizationId: string) => (dispatch: Dispatch) => {
  axios.get(`/api/contact/aggregated/organization/${organizationId}`)
    .then(...dispatchResponse(LOAD_CONTACTS_FOR_ORGANIZATION));
};

export const updateOrganization = (organization: any) => (dispatch: Dispatch) => {
  axios.patch(`/api/organization/${organization._id}`, organization)
    .then(...dispatchResponse(UPDATE_ORGANIZATION));
};

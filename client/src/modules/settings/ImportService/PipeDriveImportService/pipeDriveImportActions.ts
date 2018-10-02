import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_ORGANIZATIONS_DATA, GET_CONTACTS_DATA, GET_ORGANIZATION_FIELDS, GET_CONTACT_FIELDS } from './types';
import { dispatchResponse } from '../../../../dispatchResponse';

export const getOrganizationsData = (token:string) => (dispatch: Dispatch) => {
  axios
    .get(`https://api.pipedrive.com/v1/organizations?start=0&api_token=${token}`)
    .then(...dispatchResponse(GET_ORGANIZATIONS_DATA));
};

export const getContactsData = (token:string) => (dispatch: Dispatch) => {
  axios
    .get(`https://api.pipedrive.com/v1/persons?start=0&api_token=${token}`)
    .then(...dispatchResponse(GET_CONTACTS_DATA));
};

export const getOrganizationFields = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`https://api.pipedrive.com/v1/organizationFields?start=0&api_token=${token}`)
    .then(...dispatchResponse(GET_ORGANIZATION_FIELDS));
};

export const getContactFields = (token: string) => (dispatch: Dispatch) => {
  axios
    .get(`https://api.pipedrive.com/v1/personFields?start=0&api_token=${token}`)
    .then(...dispatchResponse(GET_CONTACT_FIELDS));
};

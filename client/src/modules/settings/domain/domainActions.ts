import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_ERRORS } from '../../../actionTypes';
import Domain from '../../../models/Domain';
import { LOAD_DOMAIN } from './types';

export const loadDomain = () => (dispatch: Dispatch, getState:any) => {
  axios
    .get(`/api/domain/${getState().auth.domainid}`).then(result => {
    dispatch(loadDomainAction(result.data));
  }).catch(errors => {
    dispatch(getErrorsAction(errors));
  });
};


export const deleteCustomField = (customFieldId: string) => (dispatch: Dispatch,getState:any) => {
  axios
    .delete(`/api/domain/${getState().auth.domainid}/settings/customFields/${customFieldId}`).then(result => {
    dispatch(loadDomainAction(result.data));
  }).catch(errors => {
    dispatch(getErrorsAction(errors));
  });
};

export function getErrorsAction(errors: any) {
  return {
    payload: errors,
    type: GET_ERRORS,
  };
}

export function loadDomainAction(domain: Domain) {
  return {
    payload: domain,
    type: LOAD_DOMAIN,
  };
}

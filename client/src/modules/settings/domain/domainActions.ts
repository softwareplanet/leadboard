import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_ERRORS } from '../../../actionTypes';
import Domain from '../../../models/Domain';
import { LOAD_DOMAIN } from './types';

export const loadDomain = (domainId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/domain/${domainId}`).then(result => {
    dispatch(loadDomainAction(result.data));
  }).catch(errors => {
    dispatch(getErrorsAction(errors));
  });
};


export const deleteCustomField = (customFieldId: string, domainId: string) => (dispatch: Dispatch) => {
  alert(customFieldId);
  axios
    .delete(`/api/domain/${domainId}/settings/customFields/${customFieldId}`).then(result => {
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

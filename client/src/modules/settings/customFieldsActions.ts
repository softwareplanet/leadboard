import axios from 'axios';
import { Dispatch } from 'redux';
import CustomFieldSetting from '../../models/customFields/CustomFieldSetting';
import { LOAD_DOMAIN } from './domain/types';

export const addCustomFieldToDomain = 
  (domainId: string, customField: CustomFieldSetting) => 
  (dispatch: Dispatch) => {
    axios
      .post(`/api/${domainId}/settings/customFields`, customField)
      .then(result => {
        dispatch({
          payload: result.data,
          type: LOAD_DOMAIN,
        });
    });
};

export const editCustomFieldInDomain = 
  (domainId: string, customField: CustomFieldSetting) => 
  (dispatch: Dispatch) => {
    axios
      .patch(`/api/${domainId}/settings/customFields/${customField._id}`, customField)
      .then(result => {
        dispatch({
          payload: result.data,
          type: LOAD_DOMAIN,
        });
    });
};

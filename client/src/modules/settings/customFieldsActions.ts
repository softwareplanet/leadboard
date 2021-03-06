import axios from 'axios';
import { Dispatch } from 'redux';
import CustomFieldSetting from '../../models/customFields/CustomFieldSetting';
import { LOAD_DOMAIN } from './domain/types';

export const addCustomFieldToDomain =
  (customField: CustomFieldSetting) =>
    (dispatch: Dispatch, getState: any) => {
      axios
        .post(`/api/domain/${getState().auth.domainid}/settings/customFields`, customField)
        .then(result => {
          dispatch({
            payload: result.data,
            type: LOAD_DOMAIN,
          });
        });
    };

export const editCustomFieldInDomain =
  (customField: CustomFieldSetting) =>
    (dispatch: Dispatch, getState: any) => {
      const customFieldId = customField._id;
      const customFieldUpdate = { ...customField };
      delete customFieldUpdate._id;
      axios
        .patch(`/api/domain/${getState().auth.domainid}/settings/customFields/${customFieldId}`, customFieldUpdate)
        .then(result => {
          dispatch({
            payload: result.data,
            type: LOAD_DOMAIN,
          });
        });
    };

import axios from 'axios';
import { Dispatch } from 'redux';
import CustomFieldSetting from '../../models/customFields/CustomFieldSetting';
import { LOAD_DOMAIN } from './domain/types';
import store from '../../store';
import domainReducer from './domain/domainReducer';

export const addCustomFieldToDomain = 
  (customField: CustomFieldSetting) => 
  (dispatch: Dispatch) => {
    axios
      .post(`/api/${domainReducer._id}/settings/customFields`, customField)
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
    axios
      .patch(`/api/${getState().domainReducer._id}/settings/customFields/${customField._id}`, customField)
      .then(result => {
        dispatch({
          payload: result.data,
          type: LOAD_DOMAIN,
        });
    });
};

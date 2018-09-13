import axios from 'axios';
import { Dispatch } from 'redux';
import CustomFieldSetting from '../../models/customFields/CustomFieldSetting';
import { ADD_CUSTOM_FIELD } from './customFieldsActionsTypes';

export const addCustomFieldToDomain = 
  (domainId: string, customField: CustomFieldSetting) => 
  (dispatch: Dispatch) => {
    axios
      .post(`/api/${domainId}/settings/customFields`, customField)
      .then(result => {
        dispatch({
          payload: result.data,
          type: ADD_CUSTOM_FIELD,
        });
    });
};

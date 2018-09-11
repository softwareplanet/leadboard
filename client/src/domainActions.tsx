import axios from 'axios';
import { Dispatch } from 'redux';
import { LOAD_SETTINGS } from './modules/lead/Dashboard/types';

export const loadDomain = (domainId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/domain/${domainId}`).then(result => {
      dispatch({type:LOAD_SETTINGS, payload: result.data});
  })
  ;
};


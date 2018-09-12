import axios from 'axios';
import { Dispatch } from 'redux';
import { LOAD_DOMAIN } from './types';

export const loadDomain = (domainId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/domain/${domainId}`).then(result => {
    dispatch({
      payload: result.data,
      type: LOAD_DOMAIN,
    });
  });
};

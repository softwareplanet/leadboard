import axios from 'axios';
import { GET_ERRORS } from '../../../actionTypes';
import { LOAD_SEARCH_RESULT } from './types';

export const loadSearchResult = (part:string) => (dispatch:any) => {
  axios.get('/api/searchResults', {
    params: {
      part,
    },
  }).then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_SEARCH_RESULT,
      });

    })
    .catch(error => {
      dispatch({
        payload: error.response.data,
        type: GET_ERRORS,
      });
    });
};

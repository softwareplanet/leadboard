import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_ERRORS } from '../../../actionTypes';
import { LOAD_SEARCH_RESULT, START_SEARCH_LOADING } from './types';

export const loadSearchResult = (query: string) => (dispatch: Dispatch) => {
  dispatch({ type: START_SEARCH_LOADING });
  axios.get('/api/searchResults', {
    params: {
      query,
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

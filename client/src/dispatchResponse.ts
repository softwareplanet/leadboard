import { GET_ERRORS } from './actionTypes';
import store from './store';
export const dispatchResponse = (actionType: any) => {
  return [
    (result: any) => store.dispatch({
      payload: result.data,
      type: actionType,
    }),
    (error: any) => store.dispatch({
      payload: error,
      type: GET_ERRORS,
    }),
  ];
};

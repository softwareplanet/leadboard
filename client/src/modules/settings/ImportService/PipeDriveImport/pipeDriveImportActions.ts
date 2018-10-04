import { Dispatch } from 'redux';
import {
  CHANGE_IMPORT_STATUS,
} from './types';

export const setImportStatus = (status: any) => (dispatch: Dispatch) => {
  dispatch({
    payload: status,
    type: CHANGE_IMPORT_STATUS,
  });
};

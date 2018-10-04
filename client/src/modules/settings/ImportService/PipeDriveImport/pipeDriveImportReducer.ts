import Action from '../../../../models/Action';
import { CHANGE_IMPORT_STATUS } from './types';

interface InitialState {
  importStatus: {
    message: string,
    status: boolean,
  };
}

const initialState: InitialState = {
  importStatus:{
    message: '',
    status: false,
  },
};

export default function(state = initialState, action: Action) {
  const  { payload }  = action;
  switch (action.type) {
    case CHANGE_IMPORT_STATUS:
      return { importStatus: payload };
    default:
      return state;
  }
}

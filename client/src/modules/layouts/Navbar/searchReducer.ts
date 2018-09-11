import {LOAD_SEARCH_RESULT} from './types';

const initialState = {
  leads: [],
  loading: false,
};

interface Action {
  type: string,
  payload: any;
}


export default function(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_SEARCH_RESULT:
      return  { ...state, ...action.payload };

    default:
      return state;
  }
}

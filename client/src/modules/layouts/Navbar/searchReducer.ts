import {LOAD_SEARCH_RESULT} from './types';

const initialState = {

  loading: false,
};

export default function(state = initialState, action:any) {
  switch (action.type) {
    case LOAD_SEARCH_RESULT:
      return  { ...state, ...action.payload };

    default:
      return state;
  }
}

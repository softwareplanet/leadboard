import { LOAD_SEARCH_RESULT, START_SEARCH_LOADING } from './types';

const initialState = {
  loading: false,
  result: [],
};

interface Action {
  type: string,
  payload: any;
}

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_SEARCH_RESULT:
      return { ...state, ...action.payload, loading: false };
    case START_SEARCH_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}

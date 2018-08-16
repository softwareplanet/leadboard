import { LOAD_ORGANIZATION, UPDATE_ORGANIZATION } from "../actions/types";

const initialState = {
  current: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ORGANIZATION:
      return {
        ...state,
        current: action.payload
      };
    case UPDATE_ORGANIZATION:
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
}
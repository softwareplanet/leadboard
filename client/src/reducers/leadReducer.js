import { LOAD_LEADBOARD, LOAD_STAGES } from "../actions/types";

const initialState = {
  funnels: [],
  stages: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEADBOARD:
      return {
        ...state,
        funnels: action.payload
      };
    case LOAD_STAGES:
      return {
        ...state,
        stages: action.payload
      };
    default:
      return state;
  }
}

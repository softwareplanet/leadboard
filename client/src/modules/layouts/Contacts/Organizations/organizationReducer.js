import { LOAD_ORGANIZATIONS } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type){
    case LOAD_ORGANIZATIONS:
      return action.payload;
    default:
      return state;
  }
}

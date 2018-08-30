import { LOAD_LEADS } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEADS:
      let leads = Object.assign({}, state);
      leads["_" + action.stage] = { leads: action.payload };
      return leads;
    default:
      return state;
  }
}

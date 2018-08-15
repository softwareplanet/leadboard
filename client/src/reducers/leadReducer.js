import { LOAD_LEADBOARD, LOAD_STAGES, LOAD_LEADS } from "../actions/types";

const initialState = {
  funnels: [],
  stages: [],
  leads: {}
};

// const replaceReducer = (type, initialState) => (state = initialState, action) => {
//   switch (action.type) {
//     case type:
//       return action.payload;
//     default:
//       return state;
//   }
// };
//
// const reducer = (type, initialState) =>
//
// export default combineReducers({
//   funnels: replaceReducer(LOAD_LEADBOARD, []),
//   stages: replaceReducer(LOAD_STAGES, []),
//   leads:
// });

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
    case LOAD_LEADS:
      let leads = Object.assign({}, state.leads);
      leads["_" + action.stage] = { leads: action.payload };
      return {
        ...state,
        leads: leads
      };
    default:
      return state;
  }
}

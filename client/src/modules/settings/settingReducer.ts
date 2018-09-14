import Action from '../../models/Action';
import Funnel from '../../models/Funnel';
import Stage from '../../models/Stage';
import { EDIT_STAGE, LOAD_FUNNELS, LOAD_STAGES, SET_FUNNEL, ADD_STAGE } from './types';


const initialState = {
  funnels: [],
  selectedFunnel: {},
  stages: [],
};

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case SET_FUNNEL: {
      const { funnels } = {...state};
      const editedFunnels = funnels
        .map((funnel: Funnel) => funnel = (funnel._id === action.payload._id) ? action.payload: funnel);
      return {
        ...state,
        funnels: editedFunnels,
        selectedFunnel: action.payload,
      }
    }
    case LOAD_FUNNELS:
     return {
       ...state,
       funnels: action.payload,
    }
    case LOAD_STAGES:
     return {
       ...state,
       stages: action.payload,
    }
    case EDIT_STAGE: {
      const { stages } = {...state};
      const editedStages = stages
        .map((stage: Stage) => stage = (stage._id === action.payload._id) ? action.payload: stage);
      return {
        ...state,
        stages: editedStages,
      }
    }
    // case ADD_STAGE: {
    //   const { stages } = {...state};
    //   stages.push(action.payload ? action.payload : undefined);
    //   return {
    //     ...state,
    //     stages: editedStages,
    //   }
    // }
    default:
      return state;
  }
}
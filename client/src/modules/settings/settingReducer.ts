import Funnel from '../../models/Funnel';
import Stage from '../../models/Stage';
import { EDIT_STAGE, LOAD_FUNNEL, LOAD_FUNNELS, LOAD_STAGES } from './types';

interface Action {
 type: string;
 payload: any;
}

const initialState = {
  funnels: [],
  selectedFunnel: {},
  stages: [],
};

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_FUNNEL: {
      const funnels = {...state.funnels};
      const editedFunnels = funnels
        .map((funnel: Funnel) => funnel = (funnel._id === action.payload._id) ? action.payload: funnel);
      return {
        ...state,
        selectedFunnel: action.payload,
        funnels: editedFunnels,
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
      const stages = {...state.stages};
      const editedStages = stages.map((stage: Stage) => stage = (stage._id === action.payload._id) ? action.payload: stage);
      return {
        ...state,
        funnels: editedStages,
      }
    }
    default:
      return state;
  }
}
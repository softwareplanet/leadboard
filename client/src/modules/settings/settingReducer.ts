import Action from '../../models/Action';
import Funnel from '../../models/Funnel';
import Stage from '../../models/Stage';
import { ADD_FUNNEL, ADD_STAGE, EDIT_STAGE, LOAD_FUNNELS, LOAD_SETTINGS_STAGES, SET_FUNNEL } from './types';

interface InitialState {
  funnels: Funnel[];
  selectedFunnel: any;
  stages: Stage[];
}

const initialState: InitialState = {
  funnels: [],
  selectedFunnel: {},
  stages: [],
};

export default function(state = initialState, action: Action) {
  switch (action.type) {
    case SET_FUNNEL: {
      const funnels = [ ...state.funnels ];
      const editedFunnels = funnels
        .map((funnel: Funnel) => funnel = (funnel._id === action.payload._id) ? action.payload : funnel);
      return {
        ...state,
        funnels: editedFunnels,
        selectedFunnel: action.payload,
      };
    }
    case LOAD_FUNNELS:
     return {
       ...state,
       funnels: action.payload,
       selectedFunnel: action.payload[0]
    };
    case LOAD_SETTINGS_STAGES:
      return {
        ...state,
        stages: action.payload,
      };
    case EDIT_STAGE: {
      const stages = [ ...state.stages ];
      const editedStages = stages
        .map((stage: Stage) => stage = (stage._id === action.payload._id) ? action.payload : stage);
      return {
        ...state,
        stages: editedStages,
      };
    }
    case ADD_FUNNEL: {
      const funnels = [ ...state.funnels ];
      funnels.push(action.payload);
      return {
        ...state,
        funnels,
      };
    }
    case ADD_STAGE: {
      const stages = [ ...state.stages ];
      stages.push(action.payload);
      return {
        ...state,
        stages,
      };
    }
    default:
      return state;
  }
}

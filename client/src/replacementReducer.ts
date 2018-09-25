import Action from './models/Action';

const replacementReducer = (type: string, initialState: any) =>
 (state = initialState, action: Action) => {
    switch (action.type) {
      case type:
        return action.payload;
      default:
        return state;
    }
};

export default replacementReducer;
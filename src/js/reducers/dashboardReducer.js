// state = {type: 'ACTION_NAME', payload: ..., error}

export default function(state = {}, action) {
  switch (action.type) {
  case 'STAGES_LOADED':
  console.log('==' + JSON.stringify(action));
    return {...state, ...{stages: action.data}};
  default:
    return state;
  }
}

import { LOAD_ORGANIZATIONS, ADD_ORGANIZATION } from "./types";

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type){
    case LOAD_ORGANIZATIONS:
      return action.payload;
    case ADD_ORGANIZATION:
      let newOrganizations = [...state];
      newOrganizations.push(action.payload);
      return newOrganizations;
    default:
      return state;
  }
}

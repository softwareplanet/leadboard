import isEmpty from "lodash.isempty";
import { SET_LOGIN_DATA } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userid: "",
  domainid: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userid: action.payload.user,
        domainid: action.payload.domain
      };
    default:
      return state;
  }
}

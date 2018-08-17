import isEmpty from "lodash.isempty";
import { SET_LOGIN_DATA, LOGOUT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userid: "",
  domainid: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userid: action.payload.user,
        userName: action.payload.userName,
        domainid: action.payload.domain,
        domainName: action.payload.domainName
      };
    case LOGOUT_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

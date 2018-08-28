import isEmpty from "lodash.isempty";
import { SET_LOGIN_DATA, LOGOUT_USER } from "./types";

const initialState = {
  isAuthenticated: false,
  userid: "",
  domainid: "",
  userName: "",
  domainName: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userid: action.payload.userId,
        userName: action.payload.userName,
        domainid: action.payload.domainId,
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

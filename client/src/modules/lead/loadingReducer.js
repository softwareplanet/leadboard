import { DASHBOARD_LOADING } from "./types";

export default function (state = false, action) {
  switch (action.type) {
    case DASHBOARD_LOADING:
      return action.payload;
    default:
      return state;
  }
}

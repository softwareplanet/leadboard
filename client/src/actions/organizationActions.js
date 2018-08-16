import axios from "axios";
import { getErrorsAction } from "./leadActions";
import { LOAD_ORGANIZATION, UPDATE_ORGANIZATION} from "./types";

export const loadOrganization = id => dispatch => {
  axios
  .get(`/api/organization/${id}`)
  .then(result => {
    dispatch({
      action: LOAD_ORGANIZATION,
      payload: result
    })
  })
  .catch(error => {
    dispatch(getErrorsAction(error.response.data.errors));
  });
};

export const updateOrganization = updatedOrganization => dispatch => {
  axios
    .patch(`/api/organization/${updatedOrganization._id}`, updatedOrganization)
    .then(result => {
      dispatch({
        action: UPDATE_ORGANIZATION,
        payload: result
      })
    })
    .catch(error => {
      dispatch(getErrorsAction(error.response.data.errors));
    });
};
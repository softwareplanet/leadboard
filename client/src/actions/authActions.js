import axios from "axios";
import { GET_ERRORS } from "./types";

// Register user
export const registerUser = (user, history) => dispatch => {
  axios
    .post("/api/register", user)
    .then(result => history.push("/")) // go to login page
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      })
    );
};

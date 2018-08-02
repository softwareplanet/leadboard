import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_LOGIN_DATA } from "./types";

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

// Login user - Get user token
export const loginUser = (user, history) => dispatch => {
  axios
    .post("/api/login", user)
    .then(result => {
      const { token } = result.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setLoginData(result.data.data));

      history.push("/home");
    })
    .catch(error => {
      console.log(JSON.stringify(error));
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

// Set logged in user and domain
export const setLoginData = data => {
  return {
    type: SET_LOGIN_DATA,
    payload: data
  };
};

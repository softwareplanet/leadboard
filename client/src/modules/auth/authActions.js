import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { SET_LOGIN_DATA } from "./types";
import { GET_ERRORS } from "../../actionTypes";

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
      dispatch(setLoginData(result.data));

      if (history) history.push("/home");
    })
    .catch(error => {
      console.log(JSON.stringify(error));
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

// Login user by ID
export const loginUserById = id => dispatch => {
  axios
    .get("/api/user/" + id)
    .then(result => {
      const loginData = {
        userId: result.data._id,
        domainId: result.data.domain
      };
      dispatch(setLoginData(loginData));
    })
    .catch(error => console.log(error));
};

// Set logged in user and domain
export const setLoginData = data => {
  return {
    type: SET_LOGIN_DATA,
    payload: data
  };
};

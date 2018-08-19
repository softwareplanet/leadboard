import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_LOGIN_DATA, LOGOUT_USER } from "./types";

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
      console.log(result.data)
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
        userName: `${result.data.firstname} ${result.data.lastname}`,
        domainId: result.data.domain._id,
        domainName: result.data.domain.name
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

export const logoutUser = history => dispatch => {
    localStorage.removeItem("jwtToken");

    setAuthToken({});
    dispatch ({
        type: LOGOUT_USER,
    });

    if (history) history.push("/");
};

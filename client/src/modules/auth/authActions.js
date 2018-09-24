import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { SET_LOGIN_DATA, LOGOUT_USER } from "./types";
import { GET_ERRORS, CLEAR_STORE } from "../../actionTypes";
import { loadDomain } from "../settings/domain/domainActions";
import { setActiveFunnel } from "../lead/leadActions";

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
export const loginUser = user => dispatch => {
  axios
    .post("/api/login", user)
    .then(result => {
      const { token } = result.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setLoginData(result.data));
      dispatch(setActiveFunnel());
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
      dispatch(loadDomain());
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
  dispatch({
    type: LOGOUT_USER,
  });

  dispatch({
    type: CLEAR_STORE
  })

  if (history) history.push("/");
};

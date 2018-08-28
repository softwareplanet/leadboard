import axios from "axios";
import { logoutUser } from "../modules/auth/authActions";
import store from "../store";

const setAuthInterceptor = () => {
  axios.interceptors.response.use(response => {
    return response;
  }, err => {
    if (err.response.status === 401) {
      store.dispatch(logoutUser());
      window.location.href = "/"
    }
    return Promise.reject(err);
  });
};

export default setAuthInterceptor;

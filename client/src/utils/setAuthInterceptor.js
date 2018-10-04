import axios from "axios";
import { logoutUser } from "../modules/auth/authActions";
import store from "../store";
import createHistory from 'history/createBrowserHistory'

const history = createHistory();


const setAuthInterceptor = () => {
  axios.interceptors.response.use(response => {
    return response;
  }, err => {
    if (err.response.status === 401 && !err.response.config.url.includes('api.pipedrive.com')) {
      store.dispatch(logoutUser());
      history.push("/");
    }
    return Promise.reject(err);
  });
};

export default setAuthInterceptor;

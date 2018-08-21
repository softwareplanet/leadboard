import axios from "axios";

const setAuthInterceptor = () => {
  axios.interceptors.response.use(response => {
    return response;
  }, err => {
    if (err.response.status === 401) {
      window.location.href = "/"
    }
    return Promise.reject(err);
  });
};

export default setAuthInterceptor;

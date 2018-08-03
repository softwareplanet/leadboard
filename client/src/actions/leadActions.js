import axios from "axios";
import { LOAD_LEADBOARD, LOAD_STAGES, GET_ERRORS } from "./types";

// Load leadboard
export const loadLeadboard = domain => dispatch => {
  axios
    .get("/api/funnel", {
      params: {
        domain
      }
    })
    .then(result => {
      dispatch({
        type: LOAD_LEADBOARD,
        payload: result.data.data
      });

      console.log("Looooading stages" + JSON.stringify(result.data.data[0]._id));
      if (typeof result.data.data[0]._id === "string") {
        dispatch(loadStages(result.data.data[0]._id, domain));
      }
    })
    .catch(error => {
      console.log("FUNNEL_ERROR" + JSON.stringify(error));
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

export const loadStages = (funnel, domain) => dispatch => {
  console.log("Looooading stages");
  axios
    .get("/api/stage", {
      params: {
        funnel,
        domain
      }
    })
    .then(result => {
      dispatch({
        type: LOAD_STAGES,
        payload: result.data.data
      });
    })
    .catch(error => {
      console.log("STAGE_ERROR" + JSON.stringify(error));
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

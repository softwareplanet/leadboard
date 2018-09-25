import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_ERRORS } from '../../actionTypes';
import { IN_PROGRESS } from '../../constants';
import FunnelModel from '../../models/Funnel';
import Stage from '../../models/Stage';
import { setActiveFunnelAction } from '../lead/leadActions';
import { ADD_DASHBOARD_FUNNELS_FILTER } from '../lead/types';
import { ADD_FUNNEL, ADD_STAGE, EDIT_STAGE, LOAD_FUNNELS, LOAD_SETTINGS_STAGES, SET_FUNNEL } from './types';


export const loadFunnels = () => (dispatch: Dispatch) => {
  axios
    .get(`/api/funnel`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_FUNNELS,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: GET_ERRORS,
      });
    });
};

export const loadSettingsStages = (funnelId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/stage?funnel=${funnelId}`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_SETTINGS_STAGES,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: GET_ERRORS,
      });
    });
};

export const updateFunnel = (funnelId: string, funnel: any) => (dispatch: Dispatch) => {
  axios
    .patch(`/api/funnel/${funnelId}`, funnel)
    .then(result => {
      dispatch({
        payload: result.data,
        type: SET_FUNNEL,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: GET_ERRORS,
      });
    });
};

export const updateStageName = (stageId: string, name: string) => (dispatch: Dispatch) => {
  axios
    .patch(`/api/stage/${stageId}`, { name })
    .then(result => {
      dispatch({
        payload: result.data,
        type: EDIT_STAGE,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: GET_ERRORS,
      });
    });
};

export const createFunnel = (name: string) => (dispatch: Dispatch) => {
  axios
    .post(`/api/funnel`, { name })
    .then(result => {
      dispatch({
        payload: result.data,
        type: ADD_FUNNEL,
      });
      dispatch({
        payload: {
          funnelId: result.data._id,
          status: IN_PROGRESS,
        },
        type: ADD_DASHBOARD_FUNNELS_FILTER,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: GET_ERRORS,
      });
    });
};

export const createStage = (stage: Stage) => (dispatch: Dispatch) => {
  axios
    .post(`/api/stage`, stage)
    .then(result => {
      dispatch({
        payload: result.data,
        type: ADD_STAGE,
      });
    })
    .catch(error => {
      dispatch({
        payload: error,
        type: GET_ERRORS,
      });
    });
};

export const selectFunnel = (funnel: FunnelModel) => (dispatch: Dispatch) => {
  dispatch({
    payload: funnel,
    type: SET_FUNNEL,
  });
  dispatch(setActiveFunnelAction(funnel));
};


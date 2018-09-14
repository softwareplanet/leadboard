import axios from 'axios';
import { Dispatch } from 'redux';
import { EDIT_STAGE, LOAD_FUNNELS, LOAD_STAGES, SET_FUNNEL, ADD_STAGE, ADD_FUNNEL } from './types';
import Stage from '../../models/Stage';
import FunnelModel from '../../models/Funnel';


export const loadFunnels = () => (dispatch: Dispatch) => {
  axios
    .get(`/api/funnel`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_FUNNELS,
      });
    });
};

export const loadStages = (funnelId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/stage?funnel=${funnelId}`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_STAGES,
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
    });
};

export const updateStage = (stageId: string, stage: any) => (dispatch: Dispatch) => {
  axios
    .patch(`/api/stage/${stageId}`, stage)
    .then(result => {
      dispatch({
        payload: result.data,
        type: EDIT_STAGE,
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
  });
 };
export const selectFunnel = (funnel: FunnelModel) => (dispatch: Dispatch) => {
  dispatch({
    payload: funnel,
    type: SET_FUNNEL
  })
};

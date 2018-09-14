import axios from 'axios';
import { Dispatch } from 'redux';
import { LOAD_FUNNELS, LOAD_FUNNEL, LOAD_STAGES, EDIT_STAGE } from './types';

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

export const loadFunnel = (funnelId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/funnel/${funnelId}`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_FUNNEL,
    });
  });
 };

 export const loadStages = (funnelId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/stage?funnelId=${funnelId}`)
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
        type: LOAD_FUNNEL,
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

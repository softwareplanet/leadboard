import axios from 'axios';
import { Dispatch } from 'redux';
import { LOAD_FUNNELS, LOAD_FUNNEL, LOAD_STAGES, EDIT_STAGE } from './types';


export const loadFunnels = (domainId: string) => (dispatch: Dispatch) => {
 axios
   .get(`/api/funnels?domainId=${domainId}`)
   .then(result => {
     dispatch({
       payload: result.data,
       type: LOAD_FUNNELS,
   });
 });
};

export const loadFunnel = (funnelId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/funnels/${funnelId}`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_FUNNEL,
    });
  });
 };

 export const loadStages = (funnelId: string) => (dispatch: Dispatch) => {
  axios
    .get(`/api/stages?funnelId=${funnelId}`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_STAGES,
    });
  });
 };

 export const updateFunnel = (funnelId: string) => (dispatch: Dispatch) => {
  axios
    .patch(`/api/funnels/${funnelId}`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: LOAD_FUNNEL,
    });
  });
 };

 export const updateStage = (stageId: string) => (dispatch: Dispatch) => {
  axios
    .patch(`/api/stages/${stageId}`)
    .then(result => {
      dispatch({
        payload: result.data,
        type: EDIT_STAGE,
    });
  });
 };

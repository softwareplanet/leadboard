/* @flow */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promisesMiddleware from './middleware/promises'
import dashboardReducer from './reducers/dashboardReducer';

/*
Store
    dispatch - вызов экшена
    subscribe - когда значение изменилось
    getState

React + redux
    connect
    Provider
*/
const reducer = combineReducers({
  dashboard: dashboardReducer
});

const createStoreWithMiddleware = applyMiddleware(
  promisesMiddleware,
  logger
)(createStore);

const store = createStoreWithMiddleware(reducer, {
  dashboard: []
});

export default store;

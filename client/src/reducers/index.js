import { combineReducers } from 'redux';
import { airportsReducer } from './airportsReducer';
import { offersReducer } from './offersReducer';

export default combineReducers({
  airports: airportsReducer,
  offers: offersReducer,
});

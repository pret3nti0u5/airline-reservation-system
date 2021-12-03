import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { airportsReducer } from './airportsReducer';
import { offersReducer } from './offersReducer';

export default combineReducers({
  airports: airportsReducer,
  offers: offersReducer,
  auth: authReducer,
});

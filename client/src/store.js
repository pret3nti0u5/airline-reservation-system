// Asbolutely boiler-plate don't think you'll need to touch this

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [reduxThunk];
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;

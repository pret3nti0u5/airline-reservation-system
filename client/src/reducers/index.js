import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { postsReducer } from './challengesReducer';

export default combineReducers({
  posts: postsReducer,
  errors: errorReducer,
  auth: authReducer,
});

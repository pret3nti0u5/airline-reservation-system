import axios from 'axios';
import { returnErrors } from './errorActions';
import { AUTH_ERROR, USER_LOADED, USER_LOADING } from './types';

export const getUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const res = await axios.get('/api/user', { withCredentials: true });
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

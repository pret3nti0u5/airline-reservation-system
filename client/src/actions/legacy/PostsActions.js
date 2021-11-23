import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_POSTS, POSTS_LOADING, CLEAR_MSGS } from './types';

export const getPosts = () => async (dispatch) => {
  dispatch(setPostsLoading());
  try {
    const res = await axios.get('/api/posts', { withCredentials: true });
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch(returnErrors(e.response.data, e.response.status));
  }
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};

// For clearing any error messages loaded in state

export const clearPostMsgs = () => {
  return { type: CLEAR_MSGS };
};

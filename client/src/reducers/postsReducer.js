import { GET_POSTS, POSTS_LOADING, CLEAR_MSGS } from '../actions/types';
const INITIAL_STATE = {
  POSTS: {},
  successMsg: null,
  failMsg: null,
  loading: false,
};

export const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, POSTS: action.payload, loading: false };
    case POSTS_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_MSGS: {
      return { ...state, successMsg: null, failMsg: null };
    }
    default:
      return state;
  }
};

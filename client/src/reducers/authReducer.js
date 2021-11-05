import { USER_LOADING, USER_LOADED, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  user: {},
  loading: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_LOADED:
      return {
        ...state,
        isSignedIn: true,
        user: action.payload,
        loading: false,
      };
    case AUTH_ERROR:
      return { ...state, isSignedIn: null, user: {}, loading: false };
    default:
      return state;
  }
};

import { GET_OFFERS, OFFERS_LOADING, CLEAR_MSGS } from '../actions/types';
const INITIAL_STATE = {
  OFFERS: [],
  successMsg: null,
  failMsg: null,
  isLoading: false,
};

export const offersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_OFFERS: {
      return { ...state, OFFERS: action.payload, isLoading: false };
    }
    case OFFERS_LOADING: {
      return { ...state, isLoading: true };
    }
    case CLEAR_MSGS: {
      return { ...state, successMsg: null, failMsg: null };
    }
    default: {
      return state;
    }
  }
};

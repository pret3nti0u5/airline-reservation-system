import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

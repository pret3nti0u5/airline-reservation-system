import { SELECT_FROM_AIRPORT, SELECT_TO_AIRPORT } from './types';

export const selectAirtport = (iata, from) => {
  return {
    type: from ? SELECT_FROM_AIRPORT : SELECT_TO_AIRPORT,
    payload: iata,
  };
};

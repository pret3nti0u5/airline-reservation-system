import { SELECT_FROM_AIRPORT, SELECT_TO_AIRPORT } from '../actions/types';

const INITIAL_STATE = {
  selectedFromAirport: 'GOI',
  selectedToAirport: 'IXC',
};

export const airportsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_FROM_AIRPORT:
      return { ...state, selectedFromAirport: action.payload };
    case SELECT_TO_AIRPORT:
      return { ...state, selectedToAirport: action.payload };
    default:
      return state;
  }
};

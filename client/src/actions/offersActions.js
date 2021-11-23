import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_OFFERS, OFFERS_LOADING } from './types';

export const getOffers =
  (
    originLocationCode,
    destinationLocationCode,
    departureDate,
    travelClass,
    nonStop
  ) =>
  async (dispatch) => {
    dispatch(setOffersLoading());
    try {
      const res = await axios.post(
        '/api/offers',
        {
          originLocationCode,
          destinationLocationCode,
          departureDate,
          travelClass,
          nonStop,
        },
        { withCredentials: true }
      );
      dispatch({
        type: GET_OFFERS,
        payload: res.data,
      });
    } catch (e) {
      dispatch(returnErrors(e.response.data, e.response.status));
    }
  };

export const setOffersLoading = () => {
  return {
    type: OFFERS_LOADING,
  };
};

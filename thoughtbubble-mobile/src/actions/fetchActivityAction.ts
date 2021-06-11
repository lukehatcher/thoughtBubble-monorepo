import axios from 'axios';
import { ActivityActionTypes } from '../constants/actionTypes';
import { BASE_URL } from '@env';

export const fetchActivityDataAction = function () {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.token?.sub;
    try {
      const response = await axios.get(`${BASE_URL}/activity`, {
        params: {
          userSub,
        },
      });
      dispatch({ type: ActivityActionTypes.FETCH, payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

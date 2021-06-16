import axios from 'axios';
import { ActivityActionTypes } from '../constants/actionTypes';
import { BASE_URL } from '@env';
import { getToken } from '../utils/asyncStorage';

export const fetchActivityDataAction = function () {
  return async (dispatch, _getState) => {
    const token = await getToken();
    try {
      const response = await axios.get(`${BASE_URL}/activity`, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: ActivityActionTypes.FETCH, payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

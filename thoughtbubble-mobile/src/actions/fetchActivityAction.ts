import axios from 'axios';
import { ActivityActionTypes } from '../constants/actionTypes';
import { getToken } from '../utils/asyncStorage';
import { AppThunk } from '../interfaces/redux';
import { BASE_URL } from '@env';

export const fetchActivityDataAction = (): AppThunk<void> => {
  return async (dispatch) => {
    const token = await getToken();
    try {
      const response = await axios.get(`${BASE_URL}/activity`, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: ActivityActionTypes.FETCH, payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

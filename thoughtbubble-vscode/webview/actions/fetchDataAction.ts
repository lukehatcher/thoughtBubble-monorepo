import axios from 'axios';
import { FilterActionTypes } from '../constants/actionTypes';
import { BASE_URL } from '../constants/config';
import { AppThunk } from '../interfaces/redux';

export const fetchDataAction = (): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    try {
      const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: 'fetchData', payload: response.data });
      dispatch({ type: FilterActionTypes.INIT, payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

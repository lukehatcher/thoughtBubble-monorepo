import axios from 'axios';
import { BASE_URL, DEV_TOKEN } from '../constants/config';

export const fetchDataAction = () => {
  return async (dispatch, _getState) => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${DEV_TOKEN}` } });
      dispatch({ type: 'fetchData', payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

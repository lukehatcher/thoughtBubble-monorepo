import axios from 'axios';
import { BASE_URL } from '../constants/config';

export const fetchDataAction = () => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    try {
      const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: 'fetchData', payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

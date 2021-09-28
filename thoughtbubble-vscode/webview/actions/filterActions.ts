import axios from 'axios';
import { BASE_URL } from '../constants/config';

export const filtertThoughtsAction = (projectId: string, filterType: string) => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    try {
      const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: `filterData/${filterType}`, payload: { data: response.data, projectId } });
    } catch (err) {
      console.error('fetchDataAction.ts: ', err);
    }
  };
};

import axios from 'axios';
import { BASE_URL, DEV_TOKEN } from '../constants/config';

export const filtertThoughtsAction = (projectId: string, filterType: string) => {
  return async (dispatch, _getState) => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${DEV_TOKEN}` } });
      dispatch({ type: `filterData/${filterType}`, payload: { data: response.data, projectId } });
    } catch (err) {
      console.error('fetchDataAction.ts: ', err);
    }
  };
};

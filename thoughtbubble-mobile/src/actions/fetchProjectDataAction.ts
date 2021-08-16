import axios from 'axios';
import { FilterActionTypes, ProjectActionTypes } from '../constants/actionTypes';
import { ArchiveActionTypes } from '../constants/actionTypes';
import { BASE_URL } from '@env';
import { getToken } from '../utils/asyncStorage';

export const fetchProjectDataAction = function () {
  return async (dispatch, _getState) => {
    const token = await getToken();
    try {
      const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: ProjectActionTypes.FETCH, payload: response.data });
      dispatch({ type: FilterActionTypes.INIT, payload: response.data });
      dispatch({ type: ArchiveActionTypes.FETCH, payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

import axios from 'axios';
import { FilterActionTypes, ProjectActionTypes } from '../constants/actionTypes';
import { ArchiveActionTypes } from '../constants/actionTypes';
import { getToken } from '../utils/asyncStorage';
import { AppThunk } from '../interfaces/redux';
import { BASE_URL } from '@env';

export const fetchProjectDataAction = (): AppThunk<void> => {
  return async (dispatch) => {
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

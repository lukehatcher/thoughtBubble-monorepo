import axios from 'axios';
import { FilterActionTypes } from '../constants/actionTypes';
import { ArchiveActionTypes } from '../constants/actionTypes';
import { BASE_URL } from '@env';

export const fetchProjectDataAction = function (userSub: string) {
  return async (dispatch, _getState) => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`, {
        params: {
          userSub,
        },
      });
      dispatch({ type: 'fetchData', payload: response.data });
      dispatch({ type: FilterActionTypes.INIT, payload: response.data });
      dispatch({ type: ArchiveActionTypes.FETCH, payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

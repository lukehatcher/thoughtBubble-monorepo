import axios from 'axios';
import { FilterActionTypes } from '../constants/actionTypes';

export const fetchProjectDataAction = function (userSub: string) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      dispatch({ type: 'fetchData', payload: response.data });
      dispatch({ type: FilterActionTypes.INIT, payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

import axios from 'axios';
import { ActivityActionTypes } from '../constants/actionTypes';

export const fetchActivityDataAction = function () {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/activity', {
        params: {
          userSub,
        },
      });
      dispatch({ type: ActivityActionTypes.FETCH, payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

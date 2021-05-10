import axios from 'axios';

export const fetchActivityDataAction = function () {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/activity', {
        params: {
          userSub,
        },
      });
      dispatch({ type: 'activity/fetch', payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

import axios from 'axios';

export const fetchDataAction = (userSub) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects/fetch', {
        params: {
          userSub,
        },
      });
      dispatch({ type: 'fetchData', payload: response.data });
    } catch (err) {
      console.error('fetchDataAction.ts: ', err);
    }
  };
};

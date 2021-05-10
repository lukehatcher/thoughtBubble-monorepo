import axios from 'axios';

export const fetchProjectDataAction = function (userSub: string) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      dispatch({ type: 'fetchData', payload: response.data });
      dispatch({ type: 'filters/initialize', payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

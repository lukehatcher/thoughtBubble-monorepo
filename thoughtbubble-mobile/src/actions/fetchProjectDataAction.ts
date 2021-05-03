import axios from 'axios';

export const fetchProjectDataAction = function (userSub: string) {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      console.log(response.data);
      console.log(response.data[0].projectThoughts[0]);
      dispatch({ type: 'fetchData', payload: response.data });
      dispatch({ type: 'filters/initialize', payload: response.data });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

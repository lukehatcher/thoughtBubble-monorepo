import axios from 'axios';
// new api
export const fetchDataAction = (userSub: string) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
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

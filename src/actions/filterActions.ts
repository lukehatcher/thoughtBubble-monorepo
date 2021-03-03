import axios from 'axios';

export const filterByCompletedAction = (projectId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/projects/fetch', {
        params: {
          userSub,
        },
      });
      dispatch({ type: 'filterData/completed', payload: { data: response.data, projectId } });
    } catch (err) {
      console.error('fetchDataAction.ts: ', err);
    }
  };
};

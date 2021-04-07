import axios from 'axios';

export const filtertThoughtsAction = function (projectId: string, filterType: string) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      dispatch({ type: `filterData/${filterType}`, payload: { data: response.data, projectId } });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

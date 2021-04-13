import axios from 'axios';
// new api
export const filtertThoughtsAction = (projectId: string, filterType: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      console.log('fgdhasjkl');
      dispatch({ type: `filterData/${filterType}`, payload: { data: response.data, projectId } });
    } catch (err) {
      console.error('fetchDataAction.ts: ', err);
    }
  };
};

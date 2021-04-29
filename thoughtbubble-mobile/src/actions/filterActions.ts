import axios from 'axios';

// interface Filters {
//   status: string;
//   tags: string[];
// }

export const filterThoughtsAction = function (projectId: string, filters: any) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      dispatch({ type: 'filterData', payload: { data: response.data, filters, projectId } });
      // update the current filters
      // dispatch({ type: 'changeStatusFilter', payload: filterType });
    } catch (err) {
      console.error('@filterDataAction.ts: ', err);
    }
  };
};

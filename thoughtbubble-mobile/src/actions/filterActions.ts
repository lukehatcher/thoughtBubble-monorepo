import axios from 'axios';

export const filterThoughtsByStatusAction = function (projectId: string, filterType: string) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      // edit the current data
      dispatch({ type: `filterData/${filterType}`, payload: { data: response.data, projectId } });
      // update the current filters
      dispatch({ type: 'changeStatusFilter', payload: filterType });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

export const filterThoughtsByTagAction = function (projectId: string, filterType: string) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      // edit the current data
      dispatch({ type: `filterData/${filterType}`, payload: { data: response.data, projectId } });
      // update the current filters
      dispatch({ type: 'changeTagFilter', payload: filterType });
    } catch (err) {
      console.error('@fetchDataAction.ts: ', err);
    }
  };
};

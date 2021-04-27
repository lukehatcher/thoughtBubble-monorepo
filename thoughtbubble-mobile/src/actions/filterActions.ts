import axios from 'axios';

interface Filters {
  status: string;
  tags: string[];
}

export const filterThoughtsAction = function (projectId: string, filters: Filters) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      // edit the current data
      dispatch({ type: 'filterData', payload: { data: response.data, projectId, filters } });
      // update the current filters
      // dispatch({ type: 'changeStatusFilter', payload: filterType });
    } catch (err) {
      console.error('@filterDataAction.ts: ', err);
    }
  };
};

// export const filterThoughtsByStatusAction = function (projectId: string, filterType: string) {
//   return async (dispatch, getState) => {
//     const userSub = getState().storedUser.sub;
//     try {
//       const response = await axios.get('http://localhost:3001/api/projects', {
//         params: {
//           userSub,
//         },
//       });
//       // edit the current data
//       dispatch({ type: `filterData/${filterType}`, payload: { data: response.data, projectId } });
//       // update the current filters
//       // dispatch({ type: 'changeStatusFilter', payload: filterType });
//     } catch (err) {
//       console.error('@filterDataAction.ts: ', err);
//     }
//   };
// };

// export const filterThoughtsByTagAction = function (projectId: string, filterType: any) {
//   return async (dispatch, getState) => {
//     const userSub = getState().storedUser.sub;
//     try {
//       const response = await axios.get('http://localhost:3001/api/projects', {
//         params: {
//           userSub,
//         },
//       });
//       // edit the current data
//       dispatch({ type: `filterData/tag`, payload: { data: response.data, projectId, filterType } });
//       // update the current filters
//       // dispatch({ type: 'changeTagFilter', payload: filterType });
//     } catch (err) {
//       console.error('@filterDataAction.ts: ', err);
//     }
//   };
// };

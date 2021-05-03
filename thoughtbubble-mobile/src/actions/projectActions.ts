import axios from 'axios';
import { locations } from '../constants/locations';

export const addProjectAction = function (projectName: string) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .post('http://localhost:3001/api/projects', {
        userSub,
        projectName,
        location: locations.MOBILE,
      })
      .then((res) => {
        const newProject = res.data;
        newProject.projectThoughts = []; // does not come with query entity
        console.log(res.data);
        dispatch({ type: 'addProject', payload: newProject });
        dispatch({ type: 'filters/addProject', payload: newProject });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

export const deleteProjectAction = function (projectId: string) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .delete('http://localhost:3001/api/projects', {
        params: {
          userSub,
          projectId,
        },
      })
      .then(() => {
        dispatch({ type: 'deleteProject', payload: projectId });
        dispatch({ type: 'filters/deleteProject', payload: projectId });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

export const filterProjectAction = function (projectId: string, filters: any) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      const response = await axios.get('http://localhost:3001/api/projects', {
        params: {
          userSub,
        },
      });
      dispatch({ type: 'filterData', payload: { data: response.data, filters, projectId } });
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

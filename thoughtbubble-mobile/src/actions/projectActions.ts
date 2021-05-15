import axios from 'axios';
import { locations } from '../constants/locations';
import { FilterActionTypes } from '../constants/actionTypes';

export const addProjectAction = function (projectName: string) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .post('http://localhost:3001/api/projects', {
        userSub,
        projectName,
        creationLocation: locations.MOBILE,
      })
      .then((res) => {
        const newProject = res.data;
        newProject.projectThoughts = []; // does not come with query entity
        console.log(res.data);
        dispatch({ type: 'addProject', payload: newProject });
        dispatch({ type: FilterActionTypes.ADD_PROJ, payload: newProject });
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
        dispatch({ type: FilterActionTypes.DEL_PROJ, payload: projectId });
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
      // this action type pertains to the project and its thoughts not the filters stored in memory
      dispatch({ type: 'filterData', payload: { data: response.data, filters, projectId } });
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

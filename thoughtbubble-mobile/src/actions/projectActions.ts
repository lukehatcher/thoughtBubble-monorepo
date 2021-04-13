import axios from 'axios';
import { ProjectShape } from '../interfaces/data';

export const addProjectAction = function (projectName: string) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .post('http://localhost:3001/api/projects', {
        userSub,
        projectName,
      })
      .then((res) => {
        const newProject: ProjectShape = res.data;
        dispatch({ type: 'addProject', payload: newProject });
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
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

import axios from 'axios';
import { ProjectShape } from '../interfaces/interfaces';

export const addProjectAction = (projectName: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
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

export const deleteProjectAction = (projectId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .delete('http://localhost:3001/api/projects', {
        params: {
          userSub,
          projectId,
        },
      })
      .then((_res) => {
        dispatch({ type: 'deleteProject', payload: projectId });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

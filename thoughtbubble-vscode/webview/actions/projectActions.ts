import axios from 'axios';
import { ProjectShape } from '../interfaces/interfaces';
import { locations } from '../constants/locations';
import { BASE_URL, DEV_TOKEN } from '../constants/config';

export const addProjectAction = (projectName: string) => {
  return async (dispatch, _getState) => {
    axios
      .post(
        `${BASE_URL}/projects`,
        {
          projectName,
          creationLocation: locations.VSCODE,
        },
        { headers: { Authorization: `Bearer ${DEV_TOKEN}` } }
      )
      .then((res) => {
        const newProject = res.data;
        newProject.projectThoughts = []; // does not come from db query
        dispatch({ type: 'addProject', payload: newProject });
      })
      .catch((err) => console.error('@projectActions.ts: fail', err));
  };
};

export const deleteProjectAction = (projectId: string) => {
  return async (dispatch, _getState) => {
    axios
      .delete(`${BASE_URL}/projects`, {
        headers: { Authorization: `Bearer ${DEV_TOKEN}` },
        params: {
          projectId,
        },
      })
      .then((_res) => {
        dispatch({ type: 'deleteProject', payload: projectId });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

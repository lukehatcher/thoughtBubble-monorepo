import axios from 'axios';
import { locations } from '../constants/locations';
import { BASE_URL } from '../constants/config';
import { AppThunk } from '../interfaces/redux';
import { ProjectActionTypes } from '../constants/actionTypes';

export const addProjectAction = (projectName: string) => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    axios
      .post(
        `${BASE_URL}/projects`,
        {
          projectName,
          creationLocation: locations.VSCODE,
        },
        { headers: { Authorization: `Bearer ${token}` } }
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
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    axios
      .delete(`${BASE_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
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

export const pinProjectAction = (projectId: string): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { token } = getState();
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/pin`,
        { projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: ProjectActionTypes.PIN, payload: response.data }); // add/re-initialize project to master filters state
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

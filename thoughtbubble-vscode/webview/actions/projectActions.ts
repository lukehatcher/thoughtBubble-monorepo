import axios from 'axios';
import { locations } from '../constants/locations';
import { BASE_URL } from '../constants/config';
import { AppThunk } from '../interfaces/redux';
import { FilterActionTypes, ProjectActionTypes } from '../constants/actionTypes';

export const addProjectAction = (projectName: string): AppThunk<void> => {
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
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        const newProject = res.data;
        newProject.projectThoughts = []; // does not come from db query
        dispatch({ type: 'addProject', payload: newProject });
        dispatch({ type: FilterActionTypes.ADD_PROJ, payload: newProject });
      })
      .catch((err) => console.error('@projectActions.ts: fail', err));
  };
};

export const deleteProjectAction = (projectId: string): AppThunk<void> => {
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
      .then(() => {
        dispatch({ type: 'deleteProject', payload: projectId });
        dispatch({ type: FilterActionTypes.DELETE_PROJ, payload: projectId });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

// TODO: remove `filters` any type
export const filterProjectAction = function (projectId: string, filters: any): AppThunk<void> {
  return async (dispatch, getState) => {
    const { token } = getState();
    try {
      const response = await axios.get(`${BASE_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } });
      // this action type pertains to the project and its thoughts not the filters stored in memory
      // the filter param is the filters stored in memory though
      dispatch({ type: ProjectActionTypes.FILTER, payload: { data: response.data, filters, projectId } });
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

export const pinProjectAction = (projectId: string): AppThunk<void> => {
  return async (dispatch, getState) => {
    const { token } = getState();
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/pin`,
        { projectId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch({ type: ProjectActionTypes.PIN, payload: response.data }); // add/re-initialize project to master filters state
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

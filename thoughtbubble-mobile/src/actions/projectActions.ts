import axios from 'axios';
import { locations } from '../constants/locations';
import { FilterActionTypes, ProjectActionTypes, ArchiveActionTypes } from '../constants/actionTypes';
import { BASE_URL } from '@env';
import { getToken } from '../utils/asyncStorage';
import { AppThunk } from '../interfaces/redux';

export const addProjectAction = function (projectName: string): AppThunk<void> {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .post(
        `${BASE_URL}/projects`,
        {
          projectName,
          creationLocation: locations.MOBILE,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        const newProject = res.data;
        newProject.projectThoughts = []; // does not come with query entity
        dispatch({ type: ProjectActionTypes.ADD_PROJ, payload: newProject });
        dispatch({ type: FilterActionTypes.ADD_PROJ, payload: newProject });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

export const deleteProjectAction = function (projectId: string): AppThunk<void> {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .delete(`${BASE_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          projectId,
        },
      })
      .then(() => {
        dispatch({ type: ProjectActionTypes.DELETE_PROJ, payload: projectId });
        dispatch({ type: FilterActionTypes.DELETE_PROJ, payload: projectId });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

export const filterProjectAction = function (projectId: string, filters: any): AppThunk<void> {
  return async (dispatch, _getState) => {
    const token = await getToken();
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

export const archiveProjectAction = function (projectId: string): AppThunk<void> {
  return async (dispatch, _getState) => {
    const token = await getToken();
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/archive`,
        { projectId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      dispatch({ type: ArchiveActionTypes.ADD_TO_ARCHIVE, payload: response.data }); // add project to archive
      dispatch({ type: ProjectActionTypes.ARCHIVE, payload: projectId }); // filter project out of main user project data
      dispatch({ type: FilterActionTypes.DELETE_PROJ, payload: projectId }); // fitler project out of master filters state
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

export const unarchiveProjectAction = function (projectId: string): AppThunk<void> {
  return async (dispatch, _getState) => {
    const token = await getToken();
    try {
      const response = await axios.put(
        `${BASE_URL}/projects/archive`,
        { projectId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      dispatch({ type: ArchiveActionTypes.REMOVE_FROM_UNARCHIVE, payload: projectId }); // filter project out of archive
      dispatch({ type: ProjectActionTypes.UNARCHIVE, payload: response.data }); // add project back to main user project data
      dispatch({ type: FilterActionTypes.ADD_PROJ, payload: response.data }); // add/re-initialize project to master filters state
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

/**
 * handle pin and un-pin
 */
export const pinProjectAction = function (projectId: string): AppThunk<void> {
  return async (dispatch, _getState) => {
    const token = await getToken();
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

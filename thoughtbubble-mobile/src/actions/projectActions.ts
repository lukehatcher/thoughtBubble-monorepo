import axios from 'axios';
import { locations } from '../constants/locations';
import { FilterActionTypes, ProjectActionTypes, ArchiveActionTypes } from '../constants/actionTypes';

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
      // the filter param is the filters stored in memory though
      dispatch({ type: 'filterData', payload: { data: response.data, filters, projectId } });
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

export const archiveProjectAction = function (projectId: string) {
  return async (dispatch, _getState) => {
    try {
      const response = await axios.put('http://localhost:3001/api/projects/archive', { projectId });
      dispatch({ type: ArchiveActionTypes.ADD_TO_ARCHIVE, payload: response.data }); // add project to archive
      dispatch({ type: ProjectActionTypes.ARCHIVE, payload: projectId }); // filter project out of main user project data
      dispatch({ type: FilterActionTypes.DEL_PROJ, payload: projectId }); // fitler project out of master filters state
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

export const unarchiveProjectAction = function (projectId: string) {
  return async (dispatch, _getState) => {
    try {
      const response = await axios.put('http://localhost:3001/api/projects/archive', { projectId });

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
export const pinProjectAction = function (projectId: string) {
  return async (dispatch, _getState) => {
    try {
      const response = await axios.put('http://localhost:3001/api/projects/pin', { projectId });
      console.log(response.data);
      dispatch({ type: ProjectActionTypes.PIN, payload: response.data }); // add/re-initialize project to master filters state
    } catch (err) {
      console.error('@projectActions.ts: ', err);
    }
  };
};

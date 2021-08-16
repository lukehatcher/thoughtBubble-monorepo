import axios from 'axios';
import { BASE_URL } from '@env';
import { locations } from '../constants/locations';
import { getToken } from '../utils/asyncStorage';
import { ProjectActionTypes } from '../constants/actionTypes';
import { AppThunk } from '../interfaces/redux';

export const addThoughtAction = (projectId: string, thought: string): AppThunk<void> => {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .post(
        `${BASE_URL}/thoughts`,
        {
          projectId,
          thought,
          creationLocation: locations.MOBILE,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        dispatch({ type: ProjectActionTypes.ADD_THOUGHT, payload: res.data });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const deleteThoughtAction = (projectId: string, thoughtId: string): AppThunk<void> => {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .delete(`${BASE_URL}/thoughts`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          projectId, // not used atm with the new api
          thoughtId,
        },
      })
      .then(() => {
        dispatch({ type: ProjectActionTypes.DELETE_THOUGHT, payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const editThoughtAction = (newThought: string, projectId: string, thoughtId: string): AppThunk<void> => {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .put(
        `${BASE_URL}/thoughts`,
        {
          projectId, // not used atm with the new api
          thoughtId,
          newThought,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        dispatch({ type: ProjectActionTypes.EDIT_THOUGHT, payload: { projectId, id: thoughtId, newThought } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const thoughtStatusChangeAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .put(
        `${BASE_URL}/thoughts/status`,
        {
          projectId, // used for updating most recent edit time
          thoughtId,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const thoughtTagChangeAction = function (
  projectId: string,
  thoughtId: string,
  tag: string | null,
): AppThunk<void> {
  return async (dispatch, _getState) => {
    const token = await getToken();
    axios
      .put(
        `${BASE_URL}/thoughts/tag`,
        {
          projectId, // used for updating most recent edit time
          thoughtId,
          tag,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        dispatch({ type: ProjectActionTypes.EDIT_THOUGHT_TAG, payload: { projectId, tag, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

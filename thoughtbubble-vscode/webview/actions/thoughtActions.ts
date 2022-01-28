import axios from 'axios';
import { locations } from '../constants/locations';
import { BASE_URL } from '../constants/config';
import { AppThunk } from '../interfaces/redux';
import { ProjectActionTypes } from '../constants/actionTypes';

export const addThoughtAction = (projectId: string, thought: string) => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    axios
      .post(
        `${BASE_URL}/thoughts`,
        {
          projectId,
          thought,
          creationLocation: locations.VSCODE,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        // const newThoughtId = res.data;
        dispatch({ type: 'addThought', payload: res.data });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const deleteThoughtAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    axios
      .delete(`${BASE_URL}/thoughts`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          projectId, // not used in api atm
          thoughtId,
        },
      })
      .then(() => {
        dispatch({ type: 'deleteThought', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const editThoughtAction = (newThought: string, projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    try {
      axios
        .put(
          `${BASE_URL}/thoughts`,
          {
            projectId, // not used in new api atm
            thoughtId,
            newThought,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then(() => {
          dispatch({ type: 'editThought', payload: { projectId, id: thoughtId, newThought } });
        });
    } catch (err) {
      console.error('@thoughtActions.ts: ', err);
    }
  };
};

export const thoughtStatusChangeAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const { token } = getState();
    if (!token) return; // TODO: validate if this logic is needed
    axios
      .put(
        `${BASE_URL}/thoughts/status`,
        {
          projectId, // not used atm
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
  return async (dispatch, getState) => {
    const { token } = getState();
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

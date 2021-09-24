import axios from 'axios';
import { locations } from '../constants/locations';
import { BASE_URL } from '../constants/config';

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
        { headers: { Authorization: `Bearer ${token}` } }
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
      .then((_res) => {
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
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((_res) => {
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
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((_res) => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

import axios from 'axios';
import { locations } from '../constants/locations';
import { BASE_URL, DEV_TOKEN } from '../constants/config';

export const addThoughtAction = (projectId: string, thought: string) => {
  return async (dispatch, _getState) => {
    axios
      .post(
        `${BASE_URL}/thoughts`,
        {
          projectId,
          thought,
          creationLocation: locations.VSCODE,
        },
        { headers: { Authorization: `Bearer ${DEV_TOKEN}` } }
      )
      .then((res) => {
        // const newThoughtId = res.data;
        dispatch({ type: 'addThought', payload: res.data });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const deleteThoughtAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, _getState) => {
    axios
      .delete(`${BASE_URL}/thoughts`, {
        headers: { Authorization: `Bearer ${DEV_TOKEN}` },
        params: {
          projectId, // not used in api atm
          thoughtId,
        },
      })
      .then((res) => {
        dispatch({ type: 'deleteThought', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const editThoughtAction = (newThought: string, projectId: string, thoughtId: string) => {
  return async (dispatch, _getState) => {
    try {
      axios
        .put(
          `${BASE_URL}/thoughts`,
          {
            projectId, // not used in new api atm
            thoughtId,
            newThought,
          },
          { headers: { Authorization: `Bearer ${DEV_TOKEN}` } }
        )
        .then((res) => {
          dispatch({ type: 'editThought', payload: { projectId, id: thoughtId, newThought } });
        });
    } catch (err) {
      console.error('@thoughtActions.ts: ', err);
    }
  };
};

export const thoughtStatusChangeAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, _getState) => {
    axios
      .put(
        `${BASE_URL}/thoughts/status`,
        {
          projectId, // not used atm
          thoughtId,
        },
        { headers: { Authorization: `Bearer ${DEV_TOKEN}` } }
      )
      .then((res) => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

import axios from 'axios';
import { locations } from '../constants/locations';
import { BASE_URL } from '@env';
import { getToken } from '../utils/asyncStorage';

export const addThoughtAction = (projectId: string, thought: string) => {
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
        dispatch({ type: 'addThought', payload: res.data });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const deleteThoughtAction = (projectId: string, thoughtId: string) => {
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
        dispatch({ type: 'deleteThought', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const editThoughtAction = (newThought: string, projectId: string, thoughtId: string) => {
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
        dispatch({ type: 'editThought', payload: { projectId, id: thoughtId, newThought } });
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

export const thoughtTagChangeAction = function (projectId: string, thoughtId: string, tag: string | null) {
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
        dispatch({ type: 'editThoughtTag', payload: { projectId, tag, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

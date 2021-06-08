import axios from 'axios';
import { locations } from '../constants/locations';
import { BASE_URL } from '@env';

export const addThoughtAction = (projectId: string, thought: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .post(`${BASE_URL}/thoughts`, {
        userSub,
        projectId,
        thought,
        creationLocation: locations.MOBILE,
      })
      .then((res) => {
        dispatch({ type: 'addThought', payload: res.data });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const deleteThoughtAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .delete(`${BASE_URL}/thoughts`, {
        params: {
          userSub, // not used atm with new api
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
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put(`${BASE_URL}/thoughts`, {
        userSub, // not use atm with the new api
        projectId, // not used atm with the new api
        thoughtId,
        newThought,
      })
      .then(() => {
        dispatch({ type: 'editThought', payload: { projectId, id: thoughtId, newThought } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const thoughtStatusChangeAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put(`${BASE_URL}/thoughts/status`, {
        userSub, // not used atm with the new api
        projectId, // used for updating most recent edit time
        thoughtId,
      })
      .then(() => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const thoughtTagChangeAction = function (projectId: string, thoughtId: string, tag: string | null) {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put(`${BASE_URL}/thoughts/tag`, {
        userSub, // not used atm with the new api
        projectId, // used for updating most recent edit time
        thoughtId,
        tag,
      })
      .then(() => {
        dispatch({ type: 'editThoughtTag', payload: { projectId, tag, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

import axios from 'axios';

export const addThoughtAction = (projectId: string, thought: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .post('http://localhost:3001/api/thoughts', {
        userSub,
        projectId,
        thought,
      })
      .then((res) => {
        // res.data -> the new thought
        console.log(res.data);
        dispatch({ type: 'addThought', payload: res.data });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const deleteThoughtAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .delete('http://localhost:3001/api/thoughts', {
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
      .put('http://localhost:3001/api/thoughts', {
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
      .put('http://localhost:3001/api/thoughts/status', {
        userSub, // not used atm with the new api
        projectId, // not used atm with the new api
        thoughtId,
      })
      .then(() => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

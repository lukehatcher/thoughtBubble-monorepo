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
        const newThoughtId = res.data;
        dispatch({ type: 'addThought', payload: { projectId, thought, _id: newThoughtId } });
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
          userSub,
          projectId,
          thoughtId,
        },
      })
      .then(() => {
        dispatch({ type: 'deleteThought', payload: { projectId, _id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const thoughtStatusChangeAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put('http://localhost:3001/api/thoughts/status', {
        userSub,
        projectId,
        thoughtId,
      })
      .then(() => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, _id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const editThoughtAction = (newThought: string, projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    axios
      .put('http://localhost:3001/api/thoughts', {
        userSub,
        projectId,
        thoughtId,
        newThought,
      })
      .then(() => {
        dispatch({ type: 'editThought', payload: { projectId, _id: thoughtId, newThought } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

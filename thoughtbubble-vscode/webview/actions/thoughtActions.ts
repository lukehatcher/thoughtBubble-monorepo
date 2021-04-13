import axios from 'axios';
// new api
export const addThoughtAction = (projectId: string, thought: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
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
// new api
export const deleteThoughtAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .delete('http://localhost:3001/api/thoughts', {
        params: {
          userSub, // not used atm
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
// new api
export const thoughtStatusChangeAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .put('http://localhost:3001/api/thoughts/status', {
        userSub,
        projectId,
        thoughtId,
      })
      .then((res) => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, _id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};
// new api
export const editThoughtAction = (newThought: string, projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    try {
      axios
        .put('http://localhost:3001/api/thoughts', {
          userSub,
          projectId,
          thoughtId,
          newThought,
        })
        .then((res) => {
          dispatch({ type: 'editThought', payload: { projectId, _id: thoughtId, newThought } });
        });
    } catch (err) {
      console.error('@thoughtActions.ts: ', err);
    }
  };
};

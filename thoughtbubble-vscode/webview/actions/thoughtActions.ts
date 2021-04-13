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

export const editThoughtAction = (newThought: string, projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    try {
      axios
        .put('http://localhost:3001/api/thoughts', {
          userSub, // not used in new api atm
          projectId, // not used in new api atm
          thoughtId,
          newThought,
        })
        .then((res) => {
          dispatch({ type: 'editThought', payload: { projectId, id: thoughtId, newThought } });
        });
    } catch (err) {
      console.error('@thoughtActions.ts: ', err);
    }
  };
};

export const thoughtStatusChangeAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .put('http://localhost:3001/api/thoughts/status', {
        userSub, // not used atm in new api
        projectId, // not used atm
        thoughtId,
      })
      .then((res) => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

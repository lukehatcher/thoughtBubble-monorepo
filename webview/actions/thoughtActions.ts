import axios from 'axios';

export const addThoughtAction = (projectId: string, thought: string) => {
  // todo -> thought DONE (except for api endpoints)
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .post('http://localhost:3001/api/projects/post', {
        type: 'todo',
        userSub,
        projectName: null,
        projectId,
        todo: thought,
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
      .delete('http://localhost:3001/api/projects/delete', {
        params: {
          type: 'todo',
          userSub,
          projectId,
          todoId: thoughtId,
        },
      })
      .then((res) => {
        dispatch({ type: 'deleteThought', payload: { projectId, _id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const thoughtStatusChangeAction = (projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .put('http://localhost:3001/api/projects/put', {
        type: 'todo/toggle',
        userSub,
        projectId,
        todoId: thoughtId,
      })
      .then((res) => {
        dispatch({ type: 'thoughtStatusChange', payload: { projectId, _id: thoughtId } });
      })
      .catch((err) => console.error('@thoughtActions.ts: ', err));
  };
};

export const editThoughtAction = (newThought: string, projectId: string, thoughtId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    try {
      axios
        .put('http://localhost:3001/api/projects/put', {
          type: 'todo/edit',
          userSub,
          projectId,
          todoId: thoughtId,
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

import axios from 'axios';
// id

export const addTodoAction = (projectId: string, todoId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .post('http://localhost:3001/api/projects/post', {
          type: 'todo',
          userSub,
          projectId,
          todoId,
        })
        .then((res) => {
          dispatch({ type: 'addTodo', payload: { projectId, todoId } });
        });
    } catch (err) {
      console.error('addProjectAction @todoActions.ts: ', err);
    }
  };
};

export const deleteTodoAction = (projectId: string, todoId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .delete('http://localhost:3001/api/projects/delete', {
          params: {
            type: 'todo',
            userSub,
            projectId,
            todoId,
          },
        })
        .then((res) => {
          dispatch({ type: 'deleteTodo', payload: { projectId, todoId } });
        });
    } catch (err) {
      console.error('deleteProjectAction @todoActions.ts: ', err);
    }
  };
};

export const todoStatusChangeAction = (projectId: string, todoId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .put('http://localhost:3001/api/projects/put', {
          type: 'todo',
          userSub,
          projectId,
          todoId,
        })
        .then((res) => {
          dispatch({ type: 'todoStatusChange', payload: { projectId, todoId } });
        });
    } catch (err) {
      console.error('todoStatusChangeAction @todoActions.ts: ', err);
    }
  };
};

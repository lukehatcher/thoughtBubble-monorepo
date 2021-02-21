import axios from 'axios';

export const addTodoAction = (projectName: string, todo: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .post('http://localhost:3001/api/projects/post', {
          type: 'todo',
          username: userSub,
          projectName,
          todo,
        })
        .then((res) => {
          // console.log(res);
          dispatch({ type: 'addTodo', payload: { projectName, todo } });
        });
    } catch (err) {
      console.error('addProjectAction @todoActions.ts: ', err);
    }
  };
};

export const deleteTodoAction = (projectName: string, todo: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .delete('http://localhost:3001/api/projects/delete', {
          params: {
            type: 'todo',
            username: userSub,
            projectName,
            todo,
          },
        })
        .then((res) => {
          dispatch({ type: 'deleteTodo', payload: { projectName, todo } });
        });
    } catch (err) {
      console.error('deleteProjectAction @todoActions.ts: ', err);
    }
  };
};

export const todoStatusChangeAction = (projectName: string, todo: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .put('http://localhost:3001/api/projects/put', {
          type: 'todo',
          username: userSub,
          projectName,
          todo,
        })
        .then((res) => {
          dispatch({ type: 'todoStatusChange', payload: { projectName, todo } });
        });
    } catch (err) {
      console.error('todoStatusChangeAction @todoActions.ts: ', err);
    }
  };
};

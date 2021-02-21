import axios from 'axios';

export const addProjectAction = (projectName: string, todo: string) => {
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
      console.error('todoActions.ts: ', err);
    }
  };
};

export const deleteProjectAction = (projectName: string, todo: string) => {
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
      console.error('todoActions.ts: ', err);
    }
  };
};

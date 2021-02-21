import axios from 'axios';

// const userSub = store.getState().storedUser.sub;

export const addProjectAction = (projectName: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .post('http://localhost:3001/api/projects/post', {
          type: 'project',
          username: userSub,
          projectName,
          todo: null,
        })
        .then((res) => {
          // console.log(res);
          dispatch({ type: 'addProject', payload: projectName });
        });
    } catch (err) {
      console.error('projectActions.ts: ', err);
    }
  };
};

export const deleteProjectAction = (projectName: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .delete('http://localhost:3001/api/projects/delete', {
          params: {
            type: 'project',
            username: userSub,
            projectName,
            todo: null,
          },
        })
        .then((res) => {
          dispatch({ type: 'deleteProject', payload: projectName });
        });
    } catch (err) {
      console.error('projectActions.ts: ', err);
    }
  };
};

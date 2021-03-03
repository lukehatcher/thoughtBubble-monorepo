import axios from 'axios';
// id
export const addProjectAction = (projectName: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .post('http://localhost:3001/api/projects/post', {
          type: 'project',
          userSub,
          projectName,
          todo: null,
        })
        .then((res) => {
          // res.data = uuid
          dispatch({ type: 'addProject', payload: { projectName, _id: res.data } });
        });
    } catch (err) {
      console.error('projectActions.ts: ', err);
    }
  };
};

export const deleteProjectAction = (projectId: string) => {
  return async (dispatch, getState) => {
    const userSub = getState().storedUser.sub;
    try {
      axios
        .delete('http://localhost:3001/api/projects/delete', {
          params: {
            type: 'project',
            userSub,
            projectId,
            todo: null,
          },
        })
        .then((res) => {
          dispatch({ type: 'deleteProject', payload: projectId });
        });
    } catch (err) {
      console.error('projectActions.ts: ', err);
    }
  };
};

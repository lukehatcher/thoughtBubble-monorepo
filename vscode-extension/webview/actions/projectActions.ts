import axios from 'axios';
// new api
export const addProjectAction = (projectName: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .post('http://localhost:3001/api/projects', {
        userSub,
        projectName,
      })
      .then((res) => {
        const newId = res.data;
        dispatch({ type: 'addProject', payload: { projectName, _id: newId } });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};
// new api
export const deleteProjectAction = (projectId: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .delete('http://localhost:3001/api/projects', {
        params: {
          userSub,
          projectId,
        },
      })
      .then((res) => {
        dispatch({ type: 'deleteProject', payload: projectId });
      })
      .catch((err) => console.error('@projectActions.ts: ', err));
  };
};

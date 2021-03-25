import axios from 'axios';

export const addProjectAction = (projectName: string) => {
  return async (dispatch, getState) => {
    const userSub = `github|${getState().storedUser.id}`;
    axios
      .post('http://localhost:3001/api/projects/post', {
        type: 'project',
        userSub,
        projectName,
        projectId: null,
        todo: null,
      })
      .then((res) => {
        console.log(res, 'hello from action');
        const newId = res.data;
        dispatch({ type: 'addProject', payload: { projectName, _id: newId } });
      })
      .catch((err) => {
        console.error('@projectActions.ts: ', err);
      });
  };
};

// export const deleteProjectAction = (projectId: string) => {
//   return async (dispatch, getState) => {
//     const userSub = `github|${getState().storedUser.id}`;
//     try {
//       axios
//         .delete('http://localhost:3001/api/projects/delete', {
//           params: {
//             type: 'project',
//             userSub,
//             projectId,
//             todo: null,
//           },
//         })
//         .then((res) => {
//           dispatch({ type: 'deleteProject', payload: projectId });
//         });
//     } catch (err) {
//       console.error('projectActions.ts: ', err);
//     }
//   };
// };

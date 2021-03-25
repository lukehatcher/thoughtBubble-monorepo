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
      .catch((err) => console.error(err));
  };
};

// export const deleteTodoAction = (projectId: string, todoId: string) => {
//   return async (dispatch, getState) => {
//     const userSub = `github|${getState().storedUser.id}`;
//     try {
//       axios
//         .delete('http://localhost:3001/api/projects/delete', {
//           params: {
//             type: 'todo',
//             userSub,
//             projectId,
//             todoId,
//           },
//         })
//         .then((res) => {
//           dispatch({ type: 'deleteTodo', payload: { projectId, _id: todoId } });
//         });
//     } catch (err) {
//       console.error('deleteProjectAction @todoActions.ts: ', err);
//     }
//   };
// };

// export const todoStatusChangeAction = (projectId: string, todoId: string) => {
//   return async (dispatch, getState) => {
//     const userSub = getState().storedUser.sub;
//     try {
//       axios
//         .put('http://localhost:3001/api/projects/put', {
//           type: 'todo/toggle',
//           userSub,
//           projectId,
//           todoId,
//           newThought: null,
//         })
//         .then((res) => {
//           dispatch({ type: 'todoStatusChange', payload: { projectId, _id: todoId } });
//         });
//     } catch (err) {
//       console.error('todoStatusChangeAction @todoActions.ts: ', err);
//     }
//   };
// };

// export const editThoughtAction = (newThought: string, projectId: string, todoId: string) => {
//   return async (dispatch, getState) => {
//     const userSub = getState().storedUser.sub;
//     try {
//       axios
//         .put('http://localhost:3001/api/projects/put', {
//           type: 'todo/edit',
//           userSub,
//           projectId,
//           todoId,
//           newThought,
//         })
//         .then((res) => {
//           dispatch({ type: 'editTodo', payload: { projectId, _id: todoId, newThought } });
//         });
//     } catch (err) {
//       console.error('editThought @todoActions.ts: ', err);
//     }
//   };
// };

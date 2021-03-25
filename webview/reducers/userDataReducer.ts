import { ProjectShape } from '../interfaces/interfaces';

const initialState = []; // array of objs, where each obj has todos arry of objs

export const UserDataReducer = (state = initialState, action): ProjectShape[] => {
  const { type, payload } = action; // need to add destructuring in other files
  switch (type) {
    case 'fetchData':
      return payload.projects;
    case 'addProject': // id
      return [
        ...state,
        {
          _id: payload._id,
          projectName: payload.projectName,
          todos: [],
        },
      ];
    case 'deleteProject':
      return state.filter((projects) => projects._id !== payload);
    // case 'addTodo':
    //   // looks complicated cause we need to copy each level
    //   return state.map((item) => {
    //     if (item._id !== payload.projectId) {
    //       return item;
    //     } else {
    //       return {
    //         ...item,
    //         todos: [
    //           ...item.todos,
    //           { _id: payload._id, text: payload.todo, completed: false }, // force break
    //         ],
    //       };
    //     }
    //   });
    // case 'deleteTodo':
    //   return state.map((item) => {
    //     if (item._id !== payload.projectId) {
    //       return item;
    //     } else {
    //       return {
    //         ...item,
    //         todos: item.todos.filter((todo) => todo._id !== payload._id),
    //       };
    //     }
    //   });
    // case 'todoStatusChange':
    //   return state.map((item) => {
    //     if (item._id !== payload.projectId) {
    //       return item;
    //     } else {
    //       return {
    //         ...item,
    //         todos: item.todos.map((todo) => {
    //           if (todo._id === payload._id) {
    //             todo.completed = !todo.completed;
    //           }
    //           return todo;
    //         }),
    //       };
    //     }
    //   });
    // case 'editTodo':
    //   return state.map((item) => {
    //     if (item._id !== payload.projectId) {
    //       return item;
    //     } else {
    //       return {
    //         ...item,
    //         todos: item.todos.map((todo) => {
    //           if (todo._id === payload._id) {
    //             todo.text = payload.newThought;
    //           }
    //           return todo;
    //         }),
    //       };
    //     }
    //   });
    // case 'filterData/completed':
    //   return payload.data.projects.map((project) => {
    //     if (project._id === payload.projectId) {
    //       return {
    //         ...project,
    //         todos: project.todos.filter((todo) => todo.completed),
    //       };
    //     } else {
    //       return project;
    //     }
    //   });
    // case 'filterData/incomplete':
    //   return payload.data.projects.map((project) => {
    //     if (project._id === payload.projectId) {
    //       return {
    //         ...project,
    //         todos: project.todos.filter((todo) => !todo.completed),
    //       };
    //     } else {
    //       return project;
    //     }
    //   });
    default:
      return state;
  }
};

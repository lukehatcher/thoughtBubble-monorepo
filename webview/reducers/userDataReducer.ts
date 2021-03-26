import { ProjectShape } from '../interfaces/interfaces';

const initialState: ProjectShape[] = [];

export const UserDataReducer = (state = initialState, action): ProjectShape[] => {
  const { type, payload } = action; // need to add destructuring in other files
  switch (type) {
    case 'fetchData':
      return payload.projects;
    case 'addProject':
      return [
        ...state,
        {
          _id: payload._id,
          projectName: payload.projectName,
          todos: [],
        },
      ];
    case 'deleteProject':
      console.log(state, 'checking things');
      return state.filter((projects) => projects._id !== payload);
    case 'addThought': // renamed for ext
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: [
              ...item.todos,
              { _id: payload._id, text: payload.thought, completed: false }, // force break
            ],
          };
        }
      });
    case 'deleteThought':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.filter((todo) => todo._id !== payload._id),
          };
        }
      });
    case 'thoughtStatusChange':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.map((todo) => {
              if (todo._id === payload._id) {
                todo.completed = !todo.completed;
              }
              return todo;
            }),
          };
        }
      });
    case 'editThought':
      return state.map((item) => {
        if (item._id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.todos.map((todo) => {
              if (todo._id === payload._id) {
                todo.text = payload.newThought;
              }
              return todo;
            }),
          };
        }
      });
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

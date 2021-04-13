import { ProjectShape } from '../interfaces/data';

const initialState: ProjectShape[] = [];

export const UserDataReducer = (state = initialState, action): ProjectShape[] => {
  const { type, payload } = action;
  switch (type) {
    case 'fetchData':
      console.log(payload, 'payload');
      return payload;
    case 'addProject':
      return [...state, payload];
    case 'deleteProject':
      return state.filter((projects) => projects.id !== payload);
    case 'addThought':
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            projectThoughts: [...item.projectThoughts, payload],
          };
        }
      });
    case 'deleteThought':
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            projectThoughts: item.projectThoughts.filter((thought) => thought.id !== payload.id),
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
            todos: item.todos.map((thought) => {
              if (thought._id === payload._id) {
                thought.completed = !thought.completed;
              }
              return thought;
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
            todos: item.todos.map((thought) => {
              if (thought._id === payload._id) {
                thought.text = payload.newThought;
              }
              return thought;
            }),
          };
        }
      });
    case 'filterData/completed':
      return payload.data.projects.map((project) => {
        if (project._id === payload.projectId) {
          return {
            ...project,
            todos: project.todos.filter((thought) => thought.completed),
          };
        } else {
          return project;
        }
      });
    case 'filterData/incomplete':
      return payload.data.projects.map((project) => {
        if (project._id === payload.projectId) {
          return {
            ...project,
            todos: project.todos.filter((thought) => !thought.completed),
          };
        } else {
          return project;
        }
      });
    default:
      return state;
  }
};

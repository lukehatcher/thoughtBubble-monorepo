import { ProjectShape } from '../interfaces/interfaces';

const initialState: ProjectShape[] = [];

export const UserDataReducer = (state = initialState, action): ProjectShape[] => {
  const { type, payload } = action; // need to add destructuring in other files
  switch (type) {
    case 'fetchData':
      return payload;
    case 'addProject':
      return [
        ...state,
        {
          id: payload.id,
          projectName: payload.projectName,
          projectThoughts: [],
          userId: payload.userId,
          completed: false,
        },
      ];
    case 'deleteProject':
      console.log(state, 'checking things');
      return state.filter((projects) => projects.id !== payload);
    case 'addThought':
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            projectThoughts: [
              ...item.projectThoughts,
              { id: payload.id, text: payload.thought, completed: false, projectId: payload.projectId, tag: null },
            ],
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
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.projectThoughts.map((todo) => {
              if (todo.id === payload.id) {
                todo.completed = !todo.completed;
              }
              return todo;
            }),
          };
        }
      });
    case 'editThought':
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            todos: item.projectThoughts.map((thought) => {
              if (thought.id === payload.id) {
                thought.text = payload.newThought;
              }
              return thought;
            }),
          };
        }
      });
    case 'filterData/completed':
      return payload.data.projects.map((project) => {
        if (project.id === payload.projectId) {
          return {
            ...project,
            projectThoughts: project.projectThoughts.filter((thought) => thought.completed),
          };
        } else {
          return project;
        }
      });
    case 'filterData/incomplete':
      return payload.data.projects.map((project) => {
        if (project.id === payload.projectId) {
          return {
            ...project,
            projectThoughts: project.projectThoughts.filter((thought) => !thought.completed),
          };
        } else {
          return project;
        }
      });
    default:
      return state;
  }
};

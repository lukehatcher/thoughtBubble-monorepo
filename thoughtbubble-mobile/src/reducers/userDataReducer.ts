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
    case 'editThought':
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === payload.id) {
                thought.text = payload.newThought;
              }
              return thought;
            }),
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
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === payload.id) {
                thought.completed = !thought.completed;
              }
              return thought;
            }),
          };
        }
      });
    case 'filterData/completed':
      return payload.data.map((project) => {
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
      return payload.data.map((project) => {
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

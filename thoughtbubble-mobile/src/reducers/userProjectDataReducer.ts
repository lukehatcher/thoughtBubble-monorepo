import { ProjectShape } from '../interfaces/data';
import { ProjectActionTypes } from '../constants/actionTypes';

const initialState: ProjectShape[] = [];

export const UserProjectDataReducer = (state = initialState, action): ProjectShape[] => {
  // should always filter out projects that have no
  const { type, payload } = action;
  switch (type) {
    case 'fetchData':
      return payload.filter((proj) => !proj.archived);
    case 'addProject':
      return [...state, payload];
    case 'deleteProject':
      return state.filter((projects) => projects.id !== payload);
    // ==== new archive cases ====
    case ProjectActionTypes.ARCHIVE:
      console.log('archived :D');
      return state.filter((projects) => projects.id !== payload);
    // case ProjectActionTypes.UNARCHIVE:
    //   return [...state, payload];
    // ===========================
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
    case 'editThoughtTag':
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === payload.id) {
                thought.tag = payload.tag;
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
    case 'filterData':
      // payload has all userProjectData, projectId and filters[] props on it, filters has id, status and tags[] on each object
      return payload.data.map((project) => {
        let { status, tags } = payload.filters.find((proj) => proj.id === payload.projectId);
        if (status === 'all') {
          if (project.id === payload.projectId) {
            if (!tags.length) return project; // if no tags
            return {
              ...project,
              projectThoughts: project.projectThoughts.filter((thought) => tags.includes(thought.tag)),
            };
          } else {
            return project;
          }
        } else {
          // convert complete/incomplete
          status = status === 'completed' ? true : false;
          // status is completed or incomplete
          if (project.id === payload.projectId) {
            if (!tags.length)
              return {
                ...project,
                projectThoughts: project.projectThoughts.filter((thought) => thought.completed === status),
              };
            return {
              ...project,
              projectThoughts: project.projectThoughts.filter(
                (thought) => thought.completed === status && tags.includes(thought.tag),
              ),
            };
          } else {
            return project;
          }
        }
      });
    default:
      return state;
  }
};

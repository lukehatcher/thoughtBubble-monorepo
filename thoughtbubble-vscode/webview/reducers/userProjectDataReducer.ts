import { ProjectActionTypes } from '../constants/actionTypes';
import { ProjectShape } from '../interfaces/interfaces';

const initialState: ProjectShape[] = [];

export const UserProjectDataReducer = (state = initialState, action): ProjectShape[] => {
  const { type, payload } = action; // need to add destructuring in other files
  switch (type) {
    case 'fetchData':
      return payload;
    case 'addProject':
      return [payload, ...state];
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
    // case 'filterData/completed':
    //   return payload.data.map((project) => {
    //     if (project.id === payload.projectId) {
    //       return {
    //         ...project,
    //         projectThoughts: project.projectThoughts.filter((thought) => thought.completed),
    //       };
    //     } else {
    //       return project;
    //     }
    //   });
    // case 'filterData/incomplete':
    //   return payload.data.map((project) => {
    //     if (project.id === payload.projectId) {
    //       return {
    //         ...project,
    //         projectThoughts: project.projectThoughts.filter((thought) => !thought.completed),
    //       };
    //     } else {
    //       return project;
    //     }
    //   });
    case ProjectActionTypes.FILTER: {
      // const filterPayload = payload as FilterPayload;
      const filterPayload = payload;
      // payload has all userProjectData, projectId and filters[] props on it, filters has id, status and tags[] on each object
      return filterPayload.data.map((project) => {
        let { status, tags } = filterPayload.filters.find((proj) => proj.id === filterPayload.projectId);
        if (status === 'all') {
          if (project.id === filterPayload.projectId) {
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
          const newStatus = status === 'completed' ? true : false;
          // status is completed or incomplete
          if (project.id === filterPayload.projectId) {
            if (!tags.length)
              return {
                ...project,
                projectThoughts: project.projectThoughts.filter((thought) => thought.completed === newStatus),
              };
            return {
              ...project,
              projectThoughts: project.projectThoughts.filter(
                (thought) => thought.completed === newStatus && tags.includes(thought.tag)
              ),
            };
          } else {
            return project;
          }
        }
      });
    }
    case ProjectActionTypes.EDIT_THOUGHT_TAG: {
      // const updatedThought = payload as EditThoughtTagPayload; // TODO
      const updatedThought = payload;
      return state.map((item) => {
        if (item.id !== updatedThought.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(),
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === updatedThought.id) {
                thought.tag = updatedThought.tag;
              }
              return thought;
            }),
          };
        }
      });
    }
    case ProjectActionTypes.PIN: {
      const pinPayload = payload as ProjectShape;
      return state.map((proj) => {
        if (proj.id === pinPayload.id) {
          return pinPayload;
        } else {
          return proj;
        }
      });
    }
    default:
      return state;
  }
};

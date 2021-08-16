import { ProjectShape } from '../interfaces/data';
import { ProjectActionTypes } from '../constants/actionTypes';

const initialState: ProjectShape[] = [];

// interface UserProjectDataReducerAction {
//   type:
//   payload:
// }

export const UserProjectDataReducer = (state = initialState, action): ProjectShape[] => {
  const { type, payload } = action;
  switch (type) {
    case ProjectActionTypes.FETCH:
      return payload.filter((proj) => !proj.archived);
    case ProjectActionTypes.ADD_PROJ:
      return [payload, ...state];
    case ProjectActionTypes.DELETE_PROJ:
      return state.filter((proj) => proj.id !== payload);
    case ProjectActionTypes.ARCHIVE:
      return state.filter((proj) => proj.id !== payload);
    case ProjectActionTypes.UNARCHIVE:
      // move to front because by default projects are shown in lastUpdated order
      return [payload, ...state];
    case ProjectActionTypes.ADD_THOUGHT:
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(), // set temp date to reorder projects, temp date is overrode next app reload
            projectThoughts: [...item.projectThoughts, payload],
          };
        }
      });
    case ProjectActionTypes.DELETE_THOUGHT:
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(),
            projectThoughts: item.projectThoughts.filter((thought) => thought.id !== payload.id),
          };
        }
      });
    case ProjectActionTypes.EDIT_THOUGHT:
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(),
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === payload.id) {
                thought.text = payload.newThought;
              }
              return thought;
            }),
          };
        }
      });
    case ProjectActionTypes.EDIT_THOUGHT_TAG:
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(),
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === payload.id) {
                thought.tag = payload.tag;
              }
              return thought;
            }),
          };
        }
      });
    case ProjectActionTypes.TOGGLE_THOUGHT_COMPLETED_STATUS:
      return state.map((item) => {
        if (item.id !== payload.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(),
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === payload.id) {
                thought.completed = !thought.completed;
              }
              return thought;
            }),
          };
        }
      });
    case ProjectActionTypes.FILTER:
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
    case ProjectActionTypes.PIN: // covers both pin and unpin
      return state.map((proj) => {
        if (proj.id === payload.id) {
          proj = payload;
          return proj;
        } else {
          return proj;
        }
      });
    default:
      return state;
  }
};

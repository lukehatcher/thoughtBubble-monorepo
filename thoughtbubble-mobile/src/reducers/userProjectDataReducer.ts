import { ProjectShape, ThoughtShape } from '../interfaces/data';
import { ProjectActionTypes } from '../constants/actionTypes';
import {
  DeleteThoughtPayload,
  EditThoughtPayload,
  EditThoughtTagPayload,
  FilterPayload,
  ToggleThoughtStatusPayload,
  UserProjectDataReducerAction,
} from '../interfaces/redux';

const initialState: ProjectShape[] = [];

export const UserProjectDataReducer = (state = initialState, action: UserProjectDataReducerAction): ProjectShape[] => {
  const { type, payload } = action;
  switch (type) {
    case ProjectActionTypes.FETCH:
      return (payload as ProjectShape[]).filter((proj) => !proj.archived);
    case ProjectActionTypes.ADD_PROJ:
      return [payload as ProjectShape, ...state];
    case ProjectActionTypes.DELETE_PROJ:
      return state.filter((proj) => proj.id !== payload);
    case ProjectActionTypes.ARCHIVE:
      return state.filter((proj) => proj.id !== payload);
    case ProjectActionTypes.UNARCHIVE:
      // move to front because by default projects are shown in lastUpdated order
      return [payload as ProjectShape, ...state];
    case ProjectActionTypes.ADD_THOUGHT: {
      const newThought = payload as ThoughtShape;
      return state.map((item) => {
        if (item.id !== newThought.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(), // set temp date to reorder projects, temp date is overrode next app reload
            projectThoughts: [...item.projectThoughts, newThought],
          };
        }
      });
    }
    case ProjectActionTypes.DELETE_THOUGHT: {
      const newProject = payload as DeleteThoughtPayload;
      return state.map((item) => {
        if (item.id !== newProject.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(),
            projectThoughts: item.projectThoughts.filter((thought) => thought.id !== newProject.id),
          };
        }
      });
    }
    case ProjectActionTypes.EDIT_THOUGHT: {
      const updatedThought = payload as EditThoughtPayload;
      return state.map((item) => {
        if (item.id !== updatedThought.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(),
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === updatedThought.id) {
                thought.text = updatedThought.newThought;
              }
              return thought;
            }),
          };
        }
      });
    }
    case ProjectActionTypes.EDIT_THOUGHT_TAG: {
      const updatedThought = payload as EditThoughtTagPayload;
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
    case ProjectActionTypes.TOGGLE_THOUGHT_COMPLETED_STATUS: {
      const updatedThought = payload as ToggleThoughtStatusPayload;
      return state.map((item) => {
        if (item.id !== updatedThought.projectId) {
          return item;
        } else {
          return {
            ...item,
            lastUpdatedDate: new Date().toISOString(),
            projectThoughts: item.projectThoughts.map((thought) => {
              if (thought.id === updatedThought.id) {
                thought.completed = !thought.completed;
              }
              return thought;
            }),
          };
        }
      });
    }
    case ProjectActionTypes.FILTER: {
      const filterPayload = payload as FilterPayload;
      // payload has all userProjectData, projectId and filters[] props on it, filters has id, status and tags[] on each object
      return filterPayload.data.map((project) => {
        const filtered = filterPayload.filters.find((proj) => proj.id === filterPayload.projectId);
        // TODO: remove this line and fix TS error
        if (!filtered) return project;
        const { status, tags } = filtered;

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
                (thought) => thought.completed === newStatus && tags.includes(thought.tag),
              ),
            };
          } else {
            return project;
          }
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

import { FilterActionTypes } from '../constants/actionTypes';
import { Status } from '../constants/status';
import { Tags } from '../constants/tags';
import { ProjectShape } from '../interfaces/interfaces';
import { FilterReducerAction, FilterReducerInitialState } from '../interfaces/redux';

const initialState: FilterReducerInitialState[] = [];

export const filterReducer = (state = initialState, action): FilterReducerInitialState[] => {
  const { type, payload } = action;
  switch (type) {
    // INIT action is called in fetchDataAction.ts right after data is fetched
    case FilterActionTypes.INIT: {
      const data = payload as ProjectShape[];
      const newState = [];
      for (let i = 0; i < data.length; i++) {
        const status = Status.ALL;
        newState.push({ id: data[i].id, status, tags: [] });
      }
      return newState;
    }
    case FilterActionTypes.ADD_PROJ:
      return [...state, { id: (payload as ProjectShape).id, status: Status.ALL, tags: [] }];
    case FilterActionTypes.DELETE_PROJ:
      return state.filter((proj) => proj.id !== payload);
    case FilterActionTypes.UPDATE:
      const { typeOfFilter, projectId } = payload as { typeOfFilter: Status | Tags; projectId: string };

      // if typeOfFilter is a status, check enum // maybe wrong
      if (Object.values(Status).includes(typeOfFilter as Status)) {
        return state.map((proj) => {
          if (proj.id === projectId) {
            proj.status = typeOfFilter as Status;
            return proj;
          } else {
            return proj;
          }
        });
      } else {
        // if typeOfFilter is a color
        return state.map((proj) => {
          if (proj.id === projectId) {
            if (proj.tags.includes(typeOfFilter as Tags)) {
              proj.tags = proj.tags.filter((tag) => tag !== typeOfFilter);
            } else {
              proj.tags.push(typeOfFilter as Tags);
            }
            return proj; // added or removed tag to proj
          } else {
            return proj; // untouched proj
          }
        });
      }
    case FilterActionTypes.CLEAR:
      return state.map((proj) => {
        if (proj.id === payload) {
          proj.tags = [];
          return proj;
        } else {
          return proj;
        }
      });
    default:
      return state;
  }
};

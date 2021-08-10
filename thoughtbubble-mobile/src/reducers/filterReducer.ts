import { FilterActionTypes } from '../constants/actionTypes';
import { statusFilters } from '../constants/filters';
import { ProjectShape } from '../interfaces/data';
import { FilterReducerAction, FilterReducerInitialState } from '../interfaces/redux';
import { StatusFilters, Tags } from '../interfaces/stringLiteralTypes';

const initialState: FilterReducerInitialState[] = [];

export const filterReducer = (state = initialState, action: FilterReducerAction): FilterReducerInitialState[] => {
  const { type, payload } = action;
  switch (type) {
    case FilterActionTypes.INIT: {
      const data = payload as ProjectShape[];
      const newState = [];
      for (let i = 0; i < data.length; i++) {
        const status: StatusFilters = 'all';
        newState.push({ id: data[i].id, status, tags: [] });
      }
      return newState;
    }
    case FilterActionTypes.ADD_PROJ:
      return [...state, { id: (payload as ProjectShape).id, status: 'all', tags: [] }];
    case FilterActionTypes.DEL_PROJ:
      return state.filter((proj) => proj.id !== payload);
    case FilterActionTypes.UPDATE:
      const { typeOfFilter, projectId } = payload as { typeOfFilter: StatusFilters | Tags; projectId: string };

      // if typeOfFilter is a status
      if (statusFilters.includes(typeOfFilter)) {
        return state.map((proj) => {
          if (proj.id === projectId) {
            proj.status = typeOfFilter as StatusFilters;
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

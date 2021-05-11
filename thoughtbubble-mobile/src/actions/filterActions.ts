import { FilterActionTypes } from '../constants/actionTypes';

export const updateFiltersAction = function (projectId: string, typeOfFilter: string) {
  return { type: FilterActionTypes.UPDATE, payload: { typeOfFilter, projectId } };
};

export const clearTagsAction = function (projectId: string) {
  return { type: FilterActionTypes.CLEAR, payload: projectId };
};

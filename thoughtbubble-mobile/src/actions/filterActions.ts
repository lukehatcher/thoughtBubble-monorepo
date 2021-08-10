import { FilterActionTypes } from '../constants/actionTypes';
import { StatusFilters, Tags } from '../interfaces/stringLiteralTypes';

export const updateFiltersAction = function (projectId: string, typeOfFilter: Tags | StatusFilters) {
  return { type: FilterActionTypes.UPDATE, payload: { typeOfFilter, projectId } };
};

export const clearTagsAction = function (projectId: string) {
  return { type: FilterActionTypes.CLEAR, payload: projectId };
};

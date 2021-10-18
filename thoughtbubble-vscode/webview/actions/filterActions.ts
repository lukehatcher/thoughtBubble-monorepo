import { Status } from '../constants/status';
import { FilterActionTypes } from '../constants/actionTypes';
import { Tags } from '../constants/tags';

// these two functions were the only functions that were in these files in the mobile version of this file
export const updateFiltersAction = function (projectId: string, typeOfFilter: Tags | Status) {
  return { type: FilterActionTypes.UPDATE, payload: { typeOfFilter, projectId } };
};

export const clearTagsAction = function (projectId: string) {
  return { type: FilterActionTypes.CLEAR, payload: projectId };
};

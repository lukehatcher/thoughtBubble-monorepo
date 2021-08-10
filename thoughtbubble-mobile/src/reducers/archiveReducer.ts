import { ProjectShape } from '../interfaces/data';
import { ArchiveActionTypes } from '../constants/actionTypes';
import { ArchiveReducerAction } from '../interfaces/redux';

const initialState: ProjectShape[] = [];

// archive date is simply the userProjectData but filtered by the 'archived' property
// archive data is not stored seperatly in the db, only indicator is the boolean 'archived' column on each project

export const archiveReducer = (state = initialState, action: ArchiveReducerAction): ProjectShape[] => {
  const { type, payload } = action;
  switch (type) {
    case ArchiveActionTypes.FETCH:
      return (payload as ProjectShape[]).filter((proj) => proj.archived);
    case ArchiveActionTypes.ADD_TO_ARCHIVE:
      return [...state, payload as ProjectShape];
    case ArchiveActionTypes.REMOVE_FROM_UNARCHIVE:
      return state.filter((proj) => proj.id !== payload);
    default:
      return state;
  }
};

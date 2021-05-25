export enum FilterActionTypes {
  INIT = 'filters/initialize',
  ADD_PROJ = 'filters/addProject',
  DEL_PROJ = 'filters/deleteProject',
  UPDATE = 'filters/update',
  CLEAR = 'filters/clearTags',
}

export enum ActivityActionTypes {
  FETCH = 'activity/fetch',
}

// added with the archive
export enum ProjectActionTypes {
  ARCHIVE = 'projects/archive',
  UNARCHIVE = 'projects/unarchive',
}

export enum ArchiveActionTypes {
  FETCH = 'archive/fetch',
  ADD_TO_ARCHIVE = 'archive/archive',
  REMOVE_FROM_UNARCHIVE = 'archive/unarchive',
}

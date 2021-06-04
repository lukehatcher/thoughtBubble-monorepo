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

export enum ProjectActionTypes {
  ARCHIVE = 'projects/archive',
  UNARCHIVE = 'projects/unarchive',
}

export enum ArchiveActionTypes {
  FETCH = 'archive/fetch',
  ADD_TO_ARCHIVE = 'archive/archive',
  REMOVE_FROM_UNARCHIVE = 'archive/unarchive',
}

export enum UserInfoActionTypes {
  // UPDATE_PROJ_DISPLAY = 'userInfo/updateProjectDisplay',
  UPDATE_ORDER = 'userInfo/updateOrder',
  UPDATE_DIRECTION = 'userInfo/updateDirection',
  UPDATE_SAVE_SETTING = 'userInfo/updateSaveSetting',
}

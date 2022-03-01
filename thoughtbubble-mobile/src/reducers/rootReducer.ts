import { combineReducers } from 'redux';
import { UserProjectDataReducer } from './userProjectDataReducer';
import { userInfoReducer } from './userInfoReducer';
import { filterReducer } from './filterReducer';
import { activityReducer } from './activityReducer';
import { archiveReducer } from './archiveReducer';

const appReducer = combineReducers({
  userProjectData: UserProjectDataReducer,
  userInfo: userInfoReducer,
  filters: filterReducer,
  activity: activityReducer,
  archive: archiveReducer,
});

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    // @ts-ignore TODO
    state = undefined;
  }
  // @ts-ignore TODO
  return appReducer(state, action);
};

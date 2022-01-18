import { AnyAction, combineReducers } from 'redux';
import { UserProjectDataReducer } from './userProjectDataReducer';
import { userInfoReducer } from './userInfoReducer';
import { filterReducer } from './filterReducer';
import { activityReducer } from './activityReducer';
import { archiveReducer } from './archiveReducer';
import { State } from '../interfaces/redux';

const appReducer = combineReducers({
  userProjectData: UserProjectDataReducer,
  userInfo: userInfoReducer,
  filters: filterReducer,
  activity: activityReducer,
  archive: archiveReducer,
});

export const rootReducer = (state: State, action: AnyAction) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

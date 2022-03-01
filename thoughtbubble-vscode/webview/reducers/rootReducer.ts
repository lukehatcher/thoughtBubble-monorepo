import { AnyAction, combineReducers } from 'redux';
import { tokenReducer } from './tokenReducer';
import { UserProjectDataReducer } from './userProjectDataReducer';
import { userInfoReducer } from './userInfoReducer';
import { filterReducer } from './filterReducer';

const appReducer = combineReducers({
  token: tokenReducer,
  userProjectData: UserProjectDataReducer,
  userInfo: userInfoReducer,
  filters: filterReducer,
});

type IRootState = ReturnType<typeof appReducer> | undefined;

export const rootReducer = (state: IRootState, action: AnyAction) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

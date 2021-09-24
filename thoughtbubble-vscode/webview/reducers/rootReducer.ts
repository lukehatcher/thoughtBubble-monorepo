import { combineReducers } from 'redux';
import { tokenReducer } from './tokenReducer';
import { UserProjectDataReducer } from './userProjectDataReducer';
import { userInfoReducer } from './userInfoReducer';

const appReducer = combineReducers({
  token: tokenReducer,
  userProjectData: UserProjectDataReducer,
  userInfo: userInfoReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

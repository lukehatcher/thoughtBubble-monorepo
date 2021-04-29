import { combineReducers } from 'redux';
import { storeUserReducer } from './storedUserReducer';
import { UserProjectDataReducer } from './userProjectDataReducer';
import { userInfoReducer } from './userInfoReducer';
import { filterReducer } from './filterReducer';

const appReducer = combineReducers({
  storedUser: storeUserReducer,
  userProjectData: UserProjectDataReducer,
  userInfo: userInfoReducer,
  filters: filterReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

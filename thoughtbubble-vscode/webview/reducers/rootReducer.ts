import { combineReducers } from 'redux';
import { storeUserReducer } from './storedUserReducer';
import { UserProjectDataReducer } from './userProjectDataReducer';

const appReducer = combineReducers({
  storedUser: storeUserReducer,
  userProjectData: UserProjectDataReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

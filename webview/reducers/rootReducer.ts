import { combineReducers } from 'redux';
import { storeUserReducer } from './storedUserReducer';
import { UserDataReducer } from './userDataReducer';

const appReducer = combineReducers({
  storedUser: storeUserReducer,
  userData: UserDataReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
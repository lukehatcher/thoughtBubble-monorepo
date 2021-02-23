import { combineReducers } from 'redux';
import { storeUserReducer } from './storedUserReducer';
import { UserDataReducer } from './userDataReducer';

const appReducer = combineReducers({
  storedUser: storeUserReducer,
  userData: UserDataReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
    // reducers are supposed to return the initial state when they are called with undefined
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>; // used for useSelector hooks

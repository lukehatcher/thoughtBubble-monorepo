import { combineReducers } from 'redux';
import { storeUserReducer } from './storedUserReducer';
import { UserDataReducer } from './userDataReducer';

const appReducer = combineReducers({
  storedUser: storeUserReducer,
  userData: UserDataReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    // reducers return initial state when called with undefined, thus this will clear store
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>; // used for useSelector hooks

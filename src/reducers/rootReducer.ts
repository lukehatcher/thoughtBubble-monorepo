import { combineReducers } from 'redux';
import { loginStatusReducer } from './loginStatusReducer';
import { storeUserReducer } from './storedUserReducer';
import { UserDataReducer } from './userDataReducer';

export const rootReducer = combineReducers({
  loginStatus: loginStatusReducer,
  storedUser: storeUserReducer,
  userData: UserDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // used for useSelector hooks

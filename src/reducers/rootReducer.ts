import { combineReducers } from 'redux';
import { loginStatusReducer } from './loginStatusReducer';
import { storeUserReducer } from './storedUserReducer';
import { UserDataReducer } from './userDataReducer';

export const rootReducer = combineReducers({
  // Define a top-level state field named `loginStatus`, handled by `loginStatusReducer`
  loginStatus: loginStatusReducer,
  storedUser: storeUserReducer,
  userData: UserDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // used for useSelector

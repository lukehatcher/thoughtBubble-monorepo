import { combineReducers } from 'redux';
import { loginStatusReducer } from './loginStatusReducer';
import { storeUserReducer } from './storeUserReducer';

export const rootReducer = combineReducers({
  // Define a top-level state field named `loginStatus`, handled by `loginStatusReducer`
  loginStatus: loginStatusReducer,
  storedUser: storeUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // used for useSelector

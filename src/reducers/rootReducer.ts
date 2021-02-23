import { combineReducers } from 'redux';
import { storeUserReducer } from './storedUserReducer';
import { UserDataReducer } from './userDataReducer';

export const rootReducer = combineReducers({
  storedUser: storeUserReducer,
  userData: UserDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // used for useSelector hooks

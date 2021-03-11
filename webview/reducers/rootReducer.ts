import { combineReducers } from 'redux';
import { storeUserReducer } from './storedUserReducer';

export const rootReducer = combineReducers({
  user: storeUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // used for useSelector hooks
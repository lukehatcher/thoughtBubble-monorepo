import { combineReducers } from 'redux';
import { loginStatusReducer } from './loginStatusReducer';

const rootReducer = combineReducers({
  // Define a top-level state field named `loginStatus`, handled by `loginStatusReducer`
  loginStatus: loginStatusReducer,
});

export default rootReducer;

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/rootReducer';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware),
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);
export default store;

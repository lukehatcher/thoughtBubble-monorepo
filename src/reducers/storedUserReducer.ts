import { idTokenShape } from '../interfaces/token';

const initialState = null;

export const storeUserReducer = (state = initialState, action): idTokenShape => {
  switch (action.type) {
    case 'storeUser/set':
      return action.payload;
    default:
      return state;
  }
};

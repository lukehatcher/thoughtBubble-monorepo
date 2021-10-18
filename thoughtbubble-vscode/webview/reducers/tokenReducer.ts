import { TokenActionTypes } from '../constants/actionTypes';

const initialState = null;

export const tokenReducer = (state = initialState, action): string | null => {
  const { type, payload } = action;
  switch (type) {
    case TokenActionTypes.STORE:
      return payload;
    default:
      return state;
  }
};

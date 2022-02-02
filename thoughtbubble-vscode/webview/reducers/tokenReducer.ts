import { AnyAction } from 'redux';
import { TokenActionTypes } from '../constants/actionTypes';

const initialState = null;

export const tokenReducer = (state = initialState, action: AnyAction): string | null => {
  const { type, payload } = action;
  switch (type) {
    case TokenActionTypes.STORE:
      return payload;
    default:
      return state;
  }
};

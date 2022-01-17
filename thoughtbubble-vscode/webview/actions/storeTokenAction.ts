import { TokenActionTypes } from '../constants/actionTypes';

export const storeTokenAction = (token: string | null) => {
  return async (dispatch) => {
    dispatch({ type: TokenActionTypes.STORE, payload: token });
  };
};

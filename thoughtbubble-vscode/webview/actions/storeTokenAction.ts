import { TokenActionTypes } from '../constants/actionTypes';
import { AppThunk } from '../interfaces/redux';

export const storeTokenAction = (token: string | null): AppThunk<void> => {
  return async (dispatch) => {
    dispatch({ type: TokenActionTypes.STORE, payload: token });
  };
};

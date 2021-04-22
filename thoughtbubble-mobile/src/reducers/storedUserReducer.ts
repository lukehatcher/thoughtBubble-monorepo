import { idTokenShape } from '../interfaces/token';

const initialState = {
  aud: '',
  auth_time: '',
  email: '',
  email_verification: true,
  exp: 0,
  family_name: '',
  given_name: '',
  iat: 0,
  iss: '',
  locale: '',
  name: '',
  nickname: '',
  picture: '',
  sub: '',
  updated_at: '',
};

export const storeUserReducer = (state = initialState, action): idTokenShape => {
  switch (action.type) {
    case 'storeUser/set':
      return action.payload;
    default:
      return state;
  }
};

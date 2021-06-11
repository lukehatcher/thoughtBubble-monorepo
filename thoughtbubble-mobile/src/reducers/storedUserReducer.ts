import { idTokenShape } from '../interfaces/token';

// const initialState = {
//   aud: '',
//   auth_time: '',
//   email: '',
//   email_verification: true,
//   exp: 0,
//   family_name: '',
//   given_name: '',
//   iat: 0,
//   iss: '',
//   locale: '',
//   name: '',
//   nickname: '',
//   picture: '',
//   sub: '',
//   updated_at: '',
// };

const initialState = {
  token: {
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
  },
  status: 'idle',
};

export const storeUserReducer = (state = initialState, action): { status: string; token: idTokenShape } => {
  switch (action.type) {
    case 'storeUser/set':
      // return action.payload;
      return { ...state, token: action.payload, status: 'succeeded' };
    default:
      console.log('vanilla return');
      return state;
  }
};

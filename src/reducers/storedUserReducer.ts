const initialState = null;

// type of a auth0 decoded JWT idToken
interface idTokenShape {
  aud: string;
  auth_time: string;
  email: string;
  email_verification: true;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export const storeUserReducer = (state = initialState, action): idTokenShape => {
  switch (action.type) {
    case 'storeUser/set':
      return action.payload;
    default:
      return state;
  }
};

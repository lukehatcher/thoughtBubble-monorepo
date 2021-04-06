// interface of a decoded auth0 JWT idToken

export interface idTokenShape {
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

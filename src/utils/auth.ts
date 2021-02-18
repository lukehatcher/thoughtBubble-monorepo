import Auth0 from 'react-native-auth0';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Alert } from 'react-native';

const auth0 = new Auth0({
  domain: 'dev-4pq8almu.us.auth0.com',
  clientId: '4fzla6jGCLomMZwbRtHNg3c970TrydDs',
});

export const _onLogIn = function (
  cb: (value: React.SetStateAction<{ accessToken: any }>) => void, // react useState type
) {
  auth0.webAuth
    .authorize({ scope: 'openid profile email' })
    .then((credentials) => {
      // credentials contains accessToken, idToken, and expiresIn val
      const decoded = jwtDecode<JwtPayload>(credentials.idToken); // cant decode access token
      console.log(decoded);

      Alert.alert(
        'AccessToken: ' +
          credentials.accessToken +
          ' IDtoken: ' +
          credentials.idToken,
      );
      cb({ accessToken: credentials.accessToken });
    })
    .catch((err) => console.error(err, 'error logging into auth0'));
};

export const _onLogOut = function (
  cb: (value: React.SetStateAction<{ accessToken: any }>) => void, // react useState type
) {
  auth0.webAuth
    .clearSession({})
    .then((success) => {
      Alert.alert('Logged out!');
      cb({ accessToken: null });
    })
    .catch((err) => console.error('Log out cancelled', err));
};

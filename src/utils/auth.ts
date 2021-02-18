import Auth0 from 'react-native-auth0';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Alert } from 'react-native';
import {
  persistidToken,
  clearAsyncStorage,
  checkForidToken,
} from './asyncStorage';

const auth0 = new Auth0({
  domain: 'dev-4pq8almu.us.auth0.com',
  clientId: '4fzla6jGCLomMZwbRtHNg3c970TrydDs',
});

export const _onLogIn = function (
  stateChange: (value: React.SetStateAction<{ accessToken: any }>) => void, // react useState type
) {
  auth0.webAuth
    .authorize({ scope: 'openid profile email', prompt: 'login' })
    .then(async (credentials) => {
      // credentials contains accessToken, idToken, and expiresIn properties
      const decodedJwt = jwtDecode<JwtPayload>(credentials.idToken); // cant decode access token
      await persistidToken(decodedJwt);
      await checkForidToken();

      // Alert.alert(
      //   'AccessToken: ' +
      //     credentials.accessToken +
      //     ' IDtoken: ' +
      //     credentials.idToken,
      // );

      stateChange({ accessToken: credentials.accessToken }); // set state
    })
    .catch((err) => console.error(err, 'error logging into auth0'));
};

export const _onLogOut = function (
  stateChange: (value: React.SetStateAction<{ accessToken: any }>) => void, // react useState type
) {
  auth0.webAuth
    .clearSession()
    .then(async () => {
      Alert.alert('Logged out!');
      stateChange({ accessToken: null });
      await clearAsyncStorage(); // kind of replace state
    })
    .catch((err) => console.error('Log out cancelled', err));
};

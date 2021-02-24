import Auth0 from 'react-native-auth0';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Alert } from 'react-native';
import { persistidToken, clearAsyncStorage } from './asyncStorage';
import store from '../store';
import { storeUserAction } from '../actions/storeUserAction';
import { fetchDataAction } from '../actions/fetchDataAction';

const auth0 = new Auth0({
  domain: 'dev-4pq8almu.us.auth0.com',
  clientId: '4fzla6jGCLomMZwbRtHNg3c970TrydDs',
});

export const _onLogIn = function () {
  auth0.webAuth
    .authorize({ scope: 'openid profile email', prompt: 'login' })
    .then(async (credentials) => {
      // credentials contains accessToken, idToken, and expiresIn properties
      const decodedJwt = jwtDecode<JwtPayload>(credentials.idToken);
      await persistidToken(decodedJwt);
      await store.dispatch(storeUserAction(decodedJwt));
      await store.dispatch(fetchDataAction(decodedJwt.sub)); // also adds user to db if needed
    })
    .catch((err) => console.log('auth.ts: login canceled/error logging into auth0', err));
};

export const _onLogOut = function () {
  auth0.webAuth
    .clearSession()
    .then(async () => {
      Alert.alert('Logged out!');
      await clearAsyncStorage();
      await store.dispatch(storeUserAction(null));
      await store.dispatch({ type: 'USER_LOGOUT', payload: null });
    })
    .catch((err) => console.log('auth.ts: log out cancelled/error logging out w auth0', err));
};

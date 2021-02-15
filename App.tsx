/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import Auth0 from 'react-native-auth0';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import { Home } from './src/components/HomeScreen';

const auth0 = new Auth0({
  domain: 'dev-4pq8almu.us.auth0.com',
  clientId: '4fzla6jGCLomMZwbRtHNg3c970TrydDs',
});

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [loggedIn, setLoggedIn] = useState({ accessToken: null });

  const _onLogIn = function () {
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
        setLoggedIn({ accessToken: credentials.accessToken });
      })
      .catch((err) => console.error(err, 'error logging into auth0'));
  };

  const _onLogOut = function () {
    auth0.webAuth
      .clearSession({})
      .then((success) => {
        Alert.alert('Logged out!');
        setLoggedIn({ accessToken: null });
      })
      .catch((err) => console.error('Log out cancelled', err));
  };

  let logStatus = loggedIn.accessToken === null ? false : true;

  if (logStatus) {
    return <Home />;
  }
  return (
    <>
      <View style={styles.view}>
        <Text>you are {logStatus ? '' : 'not'} logged in.</Text>
        <Button
          title={logStatus ? 'logout' : 'login'}
          onPress={logStatus ? _onLogOut : _onLogIn}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

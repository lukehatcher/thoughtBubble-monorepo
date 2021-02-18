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

import { AppNavTabs } from './src/components/AppNavTabs';
import { _onLogIn, _onLogOut } from './src/utils/auth';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [loggedIn, setLoggedIn] = useState({ accessToken: null });

  let logStatus = loggedIn.accessToken === null ? false : true;

  if (logStatus) {
    return <AppNavTabs />;
  }
  return (
    <>
      <View style={styles.view}>
        <Text>you are not logged in.</Text>
        <Button title="login" onPress={() => _onLogIn(setLoggedIn)} />
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { AppNavTabs } from './src/components/AppNavTabs';
import { _onLogIn } from './src/utils/auth';
import { checkForIdToken } from './src/utils/asyncStorage';
import { changeLoginStatus } from './src/actions/loginStatusAction';
import store from './src/store';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const selectStatus = (state) => state.loginStatus.status;
  const loginStatus = useSelector(selectStatus);

  if (loginStatus) {
    return <AppNavTabs />;
  }
  return (
    <>
      <View style={styles.view}>
        <Text>welcome to thoughtBubble</Text>
        <Button title="login" onPress={() => _onLogIn()} />
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

// =============================================

checkForIdToken().then((res) => {
  // this function updates the store to match my asyncstorage before rendering app
  const status = res !== null ? true : false;
  store.dispatch(changeLoginStatus(status));
});

// wrap app with redux provider
const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default ReduxApp;

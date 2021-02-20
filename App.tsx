/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { AppNavTabs } from './src/components/AppNavTabs';
import { _onLogIn } from './src/utils/auth';
import { checkForIdToken } from './src/utils/asyncStorage';
import { changeLoginStatus } from './src/actions/loginStatusAction';
import { storeUser } from './src/actions/storeUserAction';
import { RootState } from './src/reducers/rootReducer'; // type
import store from './src/store';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const selectStatus = (state: RootState) => state.loginStatus;
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

// ================== pre app render ========================
// should move this code to a seperate file later

checkForIdToken().then((res) => {
  // this function updates the store to match my asyncstorage before rendering app
  const status = res !== null;
  store.dispatch(changeLoginStatus(status)); // store login status
  store.dispatch(storeUser(res)); // store users jwt if theres one in asyncstorage
});

// wrap app with redux provider
const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default ReduxApp;

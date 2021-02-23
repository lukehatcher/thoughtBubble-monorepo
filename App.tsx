/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { AppNavTabs } from './src/components/AppNavTabs';
import { LoginScreen } from './src/components/LoginScreen';
import { checkForIdToken } from './src/utils/asyncStorage';
import { storeUserAction } from './src/actions/storeUserAction';
import { fetchDataAction } from './src/actions/fetchDataAction';
import { RootState } from './src/reducers/rootReducer'; // type
import store from './src/store';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const selector = (state: RootState) => state.storedUser;
  const loginStatus = useSelector(selector);

  if (loginStatus !== null) {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <AppNavTabs />
      </>
    );
  }
  return <LoginScreen />
};

// ================== pre app render ========================
// should move this code to a seperate file later

checkForIdToken().then(async (res) => {
  // this function updates the store to match my asyncstorage before rendering app
  // this is ONLY EXECUTED when the app is first clicked on and loaded
  const status = res !== null;
  console.log('resononse from checkforidToken: ', res);
  await store.dispatch(storeUserAction(res)); // store users jwt if theres one in asyncstorage
  if (status) {
    await store.dispatch(fetchDataAction(res.sub)); // store all data
  }
});

// wrap app with redux provider
const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default ReduxApp;

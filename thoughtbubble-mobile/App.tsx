/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';
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
  return (
    <>
      <StatusBar barStyle="light-content" />
      <LoginScreen />
    </>
  );
};

checkForIdToken().then(async (res) => {
  // this function updates the redux store to match any contents in the asyncstorage before rendering app
  // only executed when app is first loaded/launched
  const status = res !== null;
  await store.dispatch(storeUserAction(res)); // store idToken in redux store if theres an idToken in asyncstorage
  if (status) {
    await store.dispatch(fetchDataAction(res.sub)); // populate the redux store with the user's data
  }
});

// wrap app with redux provider
export const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

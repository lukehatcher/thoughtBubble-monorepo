import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Linking, Platform, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { LoginScreen } from './src/screens/LoginScreen';
import { clearAsyncStorage, getToken } from './src/utils/asyncStorage';
import { fetchProjectDataAction } from './src/actions/fetchProjectDataAction';
import { RootState } from './src/reducers/rootReducer'; // type
import store from './src/store';
import { fetchUserAction } from './src/actions/userInfoActions';
import { fetchActivityDataAction } from './src/actions/fetchActivityAction';
import { useDarkCheck } from './src/hooks/useDarkCheck';
import { AppNavigator } from './src/navigation/AppNavigator';
import { persistToken } from './src/utils/asyncStorage';
import { SplashScreen } from './src/screens/SplashScreen';

const App: FC = () => {
  const loginStatus = useSelector((state: RootState) => state.userInfo);
  console.log('loginStatus', loginStatus);
  const isDarkMode = useDarkCheck();
  const dispatch = useDispatch();

  // just logged in and was redirected, app was already open
  const handleOpenURL = async ({ url }) => {
    const token = url.split('//')[1]; // <bearer> <asdf.asdf.asdf>
    // store token in async storage
    await persistToken(token);
    // fill redux store
    dispatch(fetchUserAction(token));
    dispatch(fetchProjectDataAction());
    dispatch(fetchActivityDataAction());
  };

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      // app is not open yet i.e. opened Safarai and went to `thoughtbubble://`,
      console.log('you just opened the app by going to this url: ', url);
    });
    if (Platform.OS === 'ios') {
      Linking.addEventListener('url', handleOpenURL);
    }
    return () => {
      if (Platform.OS === 'ios') {
        Linking.removeEventListener('url', handleOpenURL);
      }
    };
  }, []);

  if (loginStatus.status === 'completed' && loginStatus.id) {
    return (
      <>
        {console.log('app screen')}
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
      </>
    );
  }
  if (loginStatus.status === 'completed' && !loginStatus.id) {
    return (
      <>
        {console.log('login screen')}
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <LoginScreen />
      </>
    );
  }
  return (
    <>
      {console.log('splash screen')}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SplashScreen />
    </>
  );
};

// DEV only:
// clearAsyncStorage().then(() => console.log('cleared async storage'));

getToken().then(async (token) => {
  // this function updates the redux store to match any contents in the asyncstorage before rendering app
  // only executed when app is first loaded/launched
  if (token !== null) {
    await store.dispatch(fetchUserAction(token));
    await store.dispatch(fetchProjectDataAction());
    await store.dispatch(fetchActivityDataAction()); // fetch user's activity data
  }
});

// wrap app with redux provider
export const ReduxApp = () => (
  <ReduxProvider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </ReduxProvider>
);

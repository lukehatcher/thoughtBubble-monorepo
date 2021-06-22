import { Linking } from 'react-native';
import { clearAsyncStorage } from './asyncStorage';
import store from '../store';
import { BASE_URL } from '@env';

export const _loginGitHub = () => {
  Linking.openURL(`${BASE_URL}/auth/github`);
};

export const _logout = async () => {
  await clearAsyncStorage();
  await store.dispatch({ type: 'USER_LOGOUT' });
  await store.dispatch({ type: 'recordNoUser' });
};

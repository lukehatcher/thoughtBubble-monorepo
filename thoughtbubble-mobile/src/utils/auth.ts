import { Linking } from 'react-native';
import { clearAsyncStorage } from './asyncStorage';
import store from '../store';
import { BASE_URL } from '@env';
import { UserInfoActionTypes } from '../constants/actionTypes';

export const _loginGitHub = () => {
  Linking.openURL(`${BASE_URL}/auth/github/mobile`);
};

export const _logout = async () => {
  await clearAsyncStorage();
  await store.dispatch({ type: 'USER_LOGOUT' });
  await store.dispatch({ type: UserInfoActionTypes.RECORD_NO_USER });
};

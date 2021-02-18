import AsyncStorage from '@react-native-async-storage/async-storage';
import { JwtPayload } from 'jwt-decode'; // type

export async function persistLoginInfo(jwt: JwtPayload) {
  try {
    await AsyncStorage.setItem('idToken', JSON.stringify(jwt));
  } catch (err) {
    console.error('error saving jwt to async storage', err);
  }
}

export async function retreiveLoggedInUser(): Promise<string | null> {
  try {
    const idToken = await AsyncStorage.getItem('idToken');
    if (idToken !== null) {
      return idToken;
    }
    return null;
  } catch (err) {
    console.error('error retreiving idToken', err);
  }
}

export async function clearAsyncStorage() {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.error('error clearing asyncstorage', err);
  }
}

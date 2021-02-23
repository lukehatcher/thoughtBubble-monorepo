import AsyncStorage from '@react-native-async-storage/async-storage';
import { JwtPayload } from 'jwt-decode'; // type

export async function persistidToken(jwt: JwtPayload) {
  try {
    console.log('idtoken has been set');
    await AsyncStorage.setItem('idToken', JSON.stringify(jwt));
  } catch (err) {
    console.error('error saving jwt to async storage', err);
  }
}

export async function checkForIdToken(): Promise<JwtPayload | null> {
  try {
    const idToken = await AsyncStorage.getItem('idToken');
    console.log('acessed idToken: ', idToken);
    if (idToken !== null) {
      return JSON.parse(idToken);
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
    console.error('error clearing async storage', err);
  }
}

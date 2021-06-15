import AsyncStorage from '@react-native-async-storage/async-storage';
import { JwtPayload } from 'jwt-decode'; // type

// export async function persistidToken(jwt: JwtPayload): Promise<void> {
//   try {
//     await AsyncStorage.setItem('idToken', JSON.stringify(jwt));
//   } catch (err) {
//     console.error('error saving jwt to async storage', err);
//   }
// }

// export class TokenManager

export async function persistToken(jwt: JwtPayload): Promise<void> {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(jwt));
    console.log('stored token in asyncstorage');
  } catch (err) {
    console.error('error saving jwt to async storage', err);
  }
}

export async function checkForToken(): Promise<JwtPayload | null> {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return JSON.parse(token);
    }
    return null;
  } catch (err) {
    console.error('error retreiving idToken', err);
    return null;
  }
}

export async function getToken(): Promise<JwtPayload | null> {
  // should never be null
  try {
    const token = await AsyncStorage.getItem('token');
    return JSON.parse(token);
  } catch (err) {
    console.error('error retreiving idToken', err);
    return null;
  }
}

export async function clearAsyncStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.error('error clearing async storage', err);
  }
}

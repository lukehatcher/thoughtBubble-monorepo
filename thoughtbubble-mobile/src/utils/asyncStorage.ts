import AsyncStorage from '@react-native-async-storage/async-storage';

export async function persistToken(jwt: string): Promise<void> {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(jwt));
    console.log('stored token in asyncstorage');
  } catch (err) {
    console.error('error saving jwt to async storage', err);
  }
}

export async function getToken(): Promise<string | null> {
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

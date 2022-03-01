import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistToken = async (jwt: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(jwt));
    console.log('stored token in asyncstorage');
  } catch (err) {
    console.error('error saving jwt to async storage', err);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  } catch (err) {
    console.error('error retreiving idToken', err);
    return null;
  }
};

export const clearAsyncStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.error('error clearing async storage', err);
  }
};

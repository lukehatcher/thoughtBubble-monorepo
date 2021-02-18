import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';

import { _onLogOut } from '../utils/auth';

interface HomeScreenProps {
  // navigation: StackNavigationProp<>
}
// https://reactnavigation.org/docs/typescript/

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View style={styles.centerView}>
      <Text>this is a home screen</Text>
      <Button title="logout" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

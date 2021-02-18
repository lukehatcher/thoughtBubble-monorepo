import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { _onLogOut } from '../utils/auth';

interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View style={styles.centerView}>
      <Text>this is a home screen</Text>
      <Button title="logout" onPress={() => _onLogOut()} />
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

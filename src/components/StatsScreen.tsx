import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer'; // type

interface StatsScreenProps {}

export const StatsScreen: React.FC<StatsScreenProps> = () => {
  // working
  return (
    <View style={styles.centerView}>
      <Text>stats/info screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    backgroundColor: '#121212',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

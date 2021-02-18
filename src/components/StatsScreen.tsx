import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer'; // type

interface StatsScreenProps {}

export const StatsScreen: React.FC<StatsScreenProps> = () => {
  const idToken = useSelector((state: RootState) => state.storedUser);
  // working
  return (
    <View style={styles.centerView}>
      {console.log(idToken)}
      <Text>stats/info screen</Text>
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

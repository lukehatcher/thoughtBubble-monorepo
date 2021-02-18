import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsScreenProps {}

export const StatsScreen: React.FC<StatsScreenProps> = () => {
  return (
    <View style={styles.centerView}>
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

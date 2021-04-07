import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsScreenProps {}

export const StatsScreen: React.FC<StatsScreenProps> = () => {
  return (
    <View style={styles.centerView}>
      <Text>coming soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    backgroundColor: '#121212',
    color: 'grey',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

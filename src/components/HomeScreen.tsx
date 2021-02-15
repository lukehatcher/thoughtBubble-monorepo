import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface HomeScreenProps {}

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <View style={styles.view}>
      <ActivityIndicator size="small" />
      <Text>
        welcome to thoughtBubble [name here from async storage or redux]
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

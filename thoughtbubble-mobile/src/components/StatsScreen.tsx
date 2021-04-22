import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useStore } from 'react-redux';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';

interface StatsScreenProps {}

export const StatsScreen: React.FC<StatsScreenProps> = () => {
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const useTheme = (name: string) => (theme ? stylesDark[name] : stylesLight[name]);

  return (
    <View style={useTheme('mainContainer')}>
      <Text style={useTheme('text')}>coming soon</Text>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.darkMode.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.darkMode.textOnBackground,
  },
});

// =====================================================

const stylesLight = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.lightMode.background,
    color: colors.lightMode.textOnBackground,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.lightMode.textOnBackground,
  },
});

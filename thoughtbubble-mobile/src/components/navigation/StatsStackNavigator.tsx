import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatsHomeScreen } from '../StatsHomeScreen';
import { StatsProjectInfoScreen } from '../StatsProjectInfoScreen';
import { StatsStackParamList } from '../../interfaces/navigation';
import { colors } from '../../constants/colors';
import { useDarkCheck } from '../../hooks/useDarkCheck';

const { darkMode, lightMode } = colors;
const Stack = createStackNavigator<StatsStackParamList>();

export const StatsStackNavigator: FC = function () {
  const isDarkMode = useDarkCheck();
  const dynamicScreenOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? darkMode.dp1 : lightMode.primary,
      // remove shadow did not work here
    },
    headerTintColor: isDarkMode ? darkMode.primary : lightMode.textOnPrimary,
    headerTitleStyle: { color: 'white' }, // constant
  };
  return (
    <Stack.Navigator screenOptions={dynamicScreenOptions}>
      <Stack.Screen name="Analytics" component={StatsHomeScreen} />
      <Stack.Screen name="Project Analytics" component={StatsProjectInfoScreen} />
    </Stack.Navigator>
  );
};

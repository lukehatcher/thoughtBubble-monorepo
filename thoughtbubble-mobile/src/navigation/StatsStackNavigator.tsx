import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatsHomeScreen } from '../screens/StatsHomeScreen';
import { StatsProjectInfoScreen } from '../screens/StatsProjectInfoScreen';
import { StatsStackParamList } from '../interfaces/navigation';
import { darkMode, lightMode } from '../constants/colors';
import { useDarkCheck } from '../hooks/useDarkCheck';

const Stack = createStackNavigator<StatsStackParamList>();

export const StatsStackNavigator: FC = function () {
  const isDarkMode = useDarkCheck();
  const dynamicScreenOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? darkMode.background : lightMode.background,
      // //   // // remove shadow
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: isDarkMode ? darkMode.primary : lightMode.primary, // stack backarrow
    headerTitleStyle: {
      color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground,
      fontFamily: 'Inter',
    },
  };
  return (
    <Stack.Navigator screenOptions={dynamicScreenOptions}>
      <Stack.Screen name="Analytics" component={StatsHomeScreen} />
      <Stack.Screen name="Project Analytics" component={StatsProjectInfoScreen} />
    </Stack.Navigator>
  );
};

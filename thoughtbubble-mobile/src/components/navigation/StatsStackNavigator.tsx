import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatsHomeScreen } from '../../screens/StatsHomeScreen';
import { StatsProjectInfoScreen } from '../../screens/StatsProjectInfoScreen';
import { StatsStackParamList } from '../../interfaces/navigation';
import { colors } from '../../constants/colors';
import { useDarkCheck } from '../../hooks/useDarkCheck';

const { darkMode, lightMode } = colors;
const Stack = createStackNavigator<StatsStackParamList>();

export const StatsStackNavigator: FC = function () {
  const isDarkMode = useDarkCheck();
  const dynamicScreenOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? darkMode.background : lightMode.background,
      //   // // remove shadow
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: isDarkMode ? darkMode.primary : lightMode.primary, // stack backarrow
    headerTitleStyle: { color: isDarkMode ? darkMode.textOnBackground : lightMode.textOnBackground },
  };
  return (
    <Stack.Navigator screenOptions={dynamicScreenOptions}>
      <Stack.Screen name="Analytics" component={StatsHomeScreen} />
      <Stack.Screen name="Project Analytics" component={StatsProjectInfoScreen} />
    </Stack.Navigator>
  );
};

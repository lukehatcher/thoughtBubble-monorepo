import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatsHomeScreen } from '../StatsHomeScreen';
import { StatsProjectInfoScreen } from '../StatsProjectInfoScreen';
import { StatsStackParamList } from '../../interfaces/navigation';
import { colors } from '../../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';

const Stack = createStackNavigator<StatsStackParamList>();

export function StatsStackNavigator() {
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);
  const dynamicScreenOptions = {
    headerStyle: {
      backgroundColor: theme ? colors.darkMode.dp1 : colors.lightMode.primary,
    },
    headerTintColor: theme ? colors.darkMode.primary : colors.lightMode.textOnPrimary,
    headerTitleStyle: { color: 'white' }, // constant
  };
  return (
    <Stack.Navigator screenOptions={dynamicScreenOptions}>
      <Stack.Screen name="StatsHome" component={StatsHomeScreen} />
      <Stack.Screen name="StatsForProject" component={StatsProjectInfoScreen} />
    </Stack.Navigator>
  );
}

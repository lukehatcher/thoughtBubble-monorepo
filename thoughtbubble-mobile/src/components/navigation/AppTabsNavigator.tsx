import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from '../SettingsScreen';
import { ProjectsStackNavigator } from './ProjectsStackNavigator';
import { StatsStackNavigator } from './StatsStackNavigator';
import { TabsParamList } from '../../interfaces/navigation';
import { AppNavTabsProps } from '../../interfaces/componentProps';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { colors } from '../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator<TabsParamList>();

export const AppTabsNavigator: FC<AppNavTabsProps> = () => {
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const dynamicTabBarOptions = {
    activeTintColor: theme ? colors.darkMode.primary : colors.lightMode.secondary,
    inactiveTintColor: theme ? colors.darkMode.textOnSurface : colors.lightMode.textOnPrimary,
    showLabel: false,
    style: {
      backgroundColor: theme ? colors.darkMode.dp1 : colors.lightMode.primary,
    },
  };

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Projects" tabBarOptions={dynamicTabBarOptions}>
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" size={30} color={color} />,
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsStackNavigator} // projects stack
          options={{
            title: 'Projects',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-list-bulleted" size={30} color={color} />,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsStackNavigator}
          options={{
            title: 'Stats',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-timeline-variant" size={30} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
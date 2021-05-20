import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from '../SettingsScreen';
import { ProjectsStackNavigator } from './ProjectsStackNavigator';
import { StatsStackNavigator } from './StatsStackNavigator';
import { TabsParamList } from '../../interfaces/navigation';
import { AppNavTabsProps } from '../../interfaces/componentProps';
import { colors } from '../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDarkCheck } from '../../hooks/useDarkCheck';
// import { StatusBar } from 'react-native';

const { darkMode, lightMode } = colors;
const Tab = createBottomTabNavigator<TabsParamList>();

export const AppTabsNavigator: FC<AppNavTabsProps> = () => {
  const isDarkMode = useDarkCheck();

  const dynamicTabBarOptions = {
    activeTintColor: isDarkMode ? darkMode.primary : lightMode.secondary,
    inactiveTintColor: isDarkMode ? darkMode.textOnSurface : lightMode.textOnPrimary,
    showLabel: false,
    style: {
      // remove shadow not working here
      backgroundColor: isDarkMode ? darkMode.dp1 : lightMode.primary,
    },
  };

  return (
    <>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
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
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chart-timeline-variant" size={30} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

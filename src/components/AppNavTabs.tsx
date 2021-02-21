import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { ProjectsNavStack } from './ProjectsNavStack';
import { StatsScreen } from './StatsScreen';
import Ionicon from 'react-native-vector-icons/Ionicons';

// similar to app.jsx for old app

type TabsParamList = {
  // all good here
  Home: undefined;
  Projects: undefined;
  Stats: undefined;
}; // https://reactnavigation.org/docs/typescript/

const Tab = createBottomTabNavigator<TabsParamList>();

interface AppNavTabsProps {}

export const AppNavTabs: React.FC<AppNavTabsProps> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          // ===== this would go in the tabsparamlist type
          // initialparams...
          // =====
          options={{
            title: 'Home',
            tabBarIcon: (
              { color, size }, // destruc. default options
            ) => <Ionicon name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsNavStack} // projects stack
          options={{
            title: 'Projects',
            tabBarIcon: (
              { color, size }, // destruc. default options
            ) => <Ionicon name="list" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: 'Stats',
            tabBarIcon: (
              { color, size }, // destruc. default options
            ) => <Ionicon name="analytics" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

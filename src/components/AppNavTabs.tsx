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
      <Tab.Navigator
        initialRouteName="Projects"
        tabBarOptions={{
          activeTintColor: '#6200EE', // purple
          inactiveTintColor: 'rgb(199, 199, 204)', // ios grey
          showLabel: false,
          style: {
            backgroundColor: '#212121', // ios grey
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: (
              { color, size }, // destruc. default options
            ) => <Ionicon name="home" size={30} color={color} />,
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsNavStack} // projects stack
          options={{
            title: 'Projects',
            tabBarIcon: (
              { color, size }, // destruc. default options
            ) => <Ionicon name="list" size={30} color={color} />,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: 'Stats',
            tabBarIcon: (
              { color, size }, // destruc. default options
            ) => <Ionicon name="analytics" size={30} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

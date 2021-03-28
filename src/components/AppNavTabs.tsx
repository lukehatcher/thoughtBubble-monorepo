import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { ProjectsNavStack } from './ProjectsNavStack';
import { StatsScreen } from './StatsScreen';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TabsParamList } from '../interfaces/navigation';
import { AppNavTabsProps } from '../interfaces/componentProps';

const Tab = createBottomTabNavigator<TabsParamList>();

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
            tabBarIcon: ({ color }) => <Ionicon name="home" size={30} color={color} />,
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsNavStack} // projects stack
          options={{
            title: 'Projects',
            tabBarIcon: ({ color }) => <Ionicon name="list" size={30} color={color} />,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            title: 'Stats',
            tabBarIcon: ({ color }) => <Ionicon name="analytics" size={30} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

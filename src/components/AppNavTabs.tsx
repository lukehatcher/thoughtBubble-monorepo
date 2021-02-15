import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicon from 'react-native-vector-icons/Ionicons';

// similar to app.jsx for old app

const Tab = createBottomTabNavigator();
interface AppNavTabsProps {}

export const AppNavTabs: React.FC<AppNavTabsProps> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: (
              { color, size }, // destruc. default options
            ) => <Ionicon name="home" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectStackNavigation} // projects stack
          options={{
            title: 'Projects',
            tabBarIcon: (
              { color, size }, // destruc. default options
            ) => <Ionicon name="list" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={Stats}
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

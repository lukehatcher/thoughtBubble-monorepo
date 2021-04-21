import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import { ProjectsNavStack } from './ProjectsNavStack';
import { StatsScreen } from './StatsScreen';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TabsParamList } from '../interfaces/navigation';
import { AppNavTabsProps } from '../interfaces/componentProps';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator<TabsParamList>();

export const AppNavTabs: React.FC<AppNavTabsProps> = () => {
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

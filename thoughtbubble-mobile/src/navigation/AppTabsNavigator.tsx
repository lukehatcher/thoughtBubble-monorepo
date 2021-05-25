import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ProjectsStackNavigator } from './ProjectsStackNavigator';
import { StatsStackNavigator } from './StatsStackNavigator';
import { TabsParamList } from '../interfaces/navigation';
import { AppNavTabsProps } from '../interfaces/componentProps';
import { colors } from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { ArchiveScreen } from '../screens/ArchiveScreen';
import { BlurView } from '@react-native-community/blur';

const { darkMode, lightMode } = colors;
const Tab = createBottomTabNavigator<TabsParamList>();

export const AppTabsNavigator: FC<AppNavTabsProps> = () => {
  const isDarkMode = useDarkCheck();

  // const dynamicTabBarOptions = {
  //   activeTintColor: isDarkMode ? darkMode.primary : lightMode.secondary,
  //   inactiveTintColor: isDarkMode ? darkMode.textOnSurface : lightMode.textOnPrimary,
  //   showLabel: false,
  //   style: {
  //     // remove shadow not working here
  //     backgroundColor: isDarkMode ? darkMode.dp1 : lightMode.primary,
  //   },
  // };

  const TabBar = (props) => (
    <BlurView
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      // blurType={isDarkMode ? 'extraDark' : 'ultraThinMaterial'}
      blurType={isDarkMode ? 'extraDark' : 'ultraThinMaterialLight'}
      // blurType={isDarkMode ? 'chromeMaterialDark' : 'regular'}
      // blurType={isDarkMode ? 'thickMaterialDark' : 'regular'}
      // blurType={isDarkMode ? 'materialDark' : 'regular'}
      // blurType={isDarkMode ? 'thinMaterialDark' : 'regular'}
      // blurType={isDarkMode ? 'ultraThinMaterialDark' : 'regular'}
      // blurAmount={99}
    >
      {/* <ControlStrip/> */}
      <BottomTabBar {...props} />
    </BlurView>
  );
  const dynamicTabBarOptions = {
    activeTintColor: isDarkMode ? darkMode.primary : lightMode.secondary,
    inactiveTintColor: isDarkMode ? darkMode.textOnSurface : `${lightMode.textOnBackground}87`,
    showLabel: false,
    style: {
      backgroundColor: 'transparent',
      // borderTopColor: isDarkMode ? '#666' : '#eee',
      borderTopColor: '#666',
    },
  };

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Projects" tabBarOptions={dynamicTabBarOptions} tabBar={TabBar}>
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
            name="Archive"
            component={ArchiveScreen} // projects stack
            options={{
              title: 'Archive',
              tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clock-outline" size={30} color={color} />,
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

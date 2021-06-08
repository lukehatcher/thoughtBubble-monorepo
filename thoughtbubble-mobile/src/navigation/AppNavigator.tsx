import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabsNavigator } from './TabsNavigator';
import { CustomDrawerContent } from './DrawerNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { darkMode, lightMode } from '../constants/colors';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

/**
 * takes the tabs navigator to show
 */
const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={AppTabsNavigator} // already made this
        options={{ headerShown: false }}
      />
      {/* ex: <Stack.Screen name="EditProfile" component={EditProfileScreen} /> */}
      {/* any screens you want to navigate to but you dont want a tab for it */}
    </Stack.Navigator>
  );
};

/**
 * highest level app navigator
 */
export const AppNavigator = () => {
  const isDarkMode = useDarkCheck();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerStyle={{ backgroundColor: isDarkMode ? darkMode.background : lightMode.background }}
        // hideStatusBar
      >
        <Drawer.Screen name="AppStack" component={MainStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

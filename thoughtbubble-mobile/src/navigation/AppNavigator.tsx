import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabsNavigator } from './TabsNavigator';
import { DrawerContent } from '../components/Drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useDarkCheck } from '../hooks/useDarkCheck';
import { darkMode, lightMode } from '../constants/colors';
import RNBootSplash from 'react-native-bootsplash';

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
 * highest level app navigator, happens to be a drawer
 */
export const AppNavigator = () => {
  const isDarkMode = useDarkCheck();
  return (
    // removes splash screen onload
    <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{ backgroundColor: isDarkMode ? darkMode.background : lightMode.background }}
        // hideStatusBar
      >
        <Drawer.Screen name="AppStack" component={MainStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

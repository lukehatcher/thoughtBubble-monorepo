import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

/**
 * drawer content
 */
export const CustomDrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem label="Settings" onPress={() => navigation.navigate('Settings')} />
      <DrawerItem label="Projects" onPress={() => navigation.navigate('Projects')} />
      <DrawerItem label="Archive" onPress={() => navigation.navigate('Archive')} />
      <DrawerItem label="Stats" onPress={() => navigation.navigate('Stats')} />
    </DrawerContentScrollView>
  );
};

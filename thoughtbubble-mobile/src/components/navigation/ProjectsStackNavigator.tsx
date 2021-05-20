import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectsScreen } from '../ProjectsScreen';
import { ThoughtsScreen } from '../ThoughtsScreen';
import { ProjectStackParamList } from '../../interfaces/navigation';
import { ProjectsStackNavigatorProps } from '../../interfaces/componentProps';
import { colors } from '../../constants/colors';
import { useDarkCheck } from '../../hooks/useDarkCheck';

const { darkMode, lightMode } = colors;
const ProjectStack = createStackNavigator<ProjectStackParamList>();

export const ProjectsStackNavigator: FC<ProjectsStackNavigatorProps> = () => {
  const isDarkMode = useDarkCheck();

  const dynamicScreenOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? darkMode.dp1 : lightMode.primary,
      // remove shadow working
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: isDarkMode ? darkMode.primary : lightMode.textOnPrimary,
    headerTitleStyle: { color: 'white' }, // constant
  };

  return (
    <ProjectStack.Navigator screenOptions={dynamicScreenOptions}>
      <ProjectStack.Screen name="Projects" component={ProjectsScreen} />
      <ProjectStack.Screen name="Thoughts" component={ThoughtsScreen} />
    </ProjectStack.Navigator>
  );
};

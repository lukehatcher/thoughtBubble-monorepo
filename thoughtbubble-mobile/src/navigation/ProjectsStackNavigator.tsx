import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { ThoughtsScreen } from '../screens/ThoughtsScreen';
import { ProjectStackParamList } from '../interfaces/navigation';
import { ProjectsStackNavigatorProps } from '../interfaces/navigation';

const ProjectStack = createStackNavigator<ProjectStackParamList>();

export const ProjectsStackNavigator: FC<ProjectsStackNavigatorProps> = () => {
  const screenOptions = {
    headerShown: false,
  };

  return (
    <ProjectStack.Navigator screenOptions={screenOptions}>
      <ProjectStack.Screen name="Projects" component={ProjectsScreen} />
      <ProjectStack.Screen name="Thoughts" component={ThoughtsScreen} />
    </ProjectStack.Navigator>
  );
};

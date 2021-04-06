import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectsScreen } from './ProjectsScreen';
import { ThoughtsScreen } from './ThoughtsScreen';
import { StackParamList } from '../interfaces/navigation';
import { ProjectsNavStackProps } from '../interfaces/componentProps';

const ProjectStack = createStackNavigator<StackParamList>();

export const ProjectsNavStack: React.FC<ProjectsNavStackProps> = () => {
  return (
    <ProjectStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#212121',
        },
        headerTintColor: 'rgb(199, 199, 204)',
      }}
    >
      <ProjectStack.Screen name="Projects" component={ProjectsScreen} />
      <ProjectStack.Screen name="Thoughts" component={ThoughtsScreen} />
    </ProjectStack.Navigator>
  );
};

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectsScreen } from './ProjectsScreen';
import { TodosScreen } from './TodosScreen';

const ProjectStack = createStackNavigator();

interface ProjectsNavStackProps {}

export const ProjectsNavStack: React.FC<ProjectsNavStackProps> = () => {
  return (
    <ProjectStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <ProjectStack.Screen name="Projects" component={ProjectsScreen} />
      <ProjectStack.Screen name="Todos" component={TodosScreen} />
    </ProjectStack.Navigator>
  );
};

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProjectsScreen } from './ProjectsScreen';
import { TodosScreen } from './TodosScreen';

export type StackParamList = {
  // all good here
  Projects: undefined;
  Todos: {
    projectName: string; // should be id
  };
};

const ProjectStack = createStackNavigator<StackParamList>();

interface ProjectsNavStackProps {}

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
      <ProjectStack.Screen name="Todos" component={TodosScreen} />
    </ProjectStack.Navigator>
  );
};

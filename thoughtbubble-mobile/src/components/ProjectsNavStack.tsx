import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ProjectsScreen } from './ProjectsScreen';
import { ThoughtsScreen } from './ThoughtsScreen';
import { StackParamList } from '../interfaces/navigation';
import { ProjectsNavStackProps } from '../interfaces/componentProps';
import { colors } from '../constants/colors';
import { RootState } from '../reducers/rootReducer';

const ProjectStack = createStackNavigator<StackParamList>();

export const ProjectsNavStack: React.FC<ProjectsNavStackProps> = () => {
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const dynamicScreenOptions = {
    headerStyle: {
      backgroundColor: theme ? colors.darkMode.dp1 : colors.lightMode.primary,
    },
    headerTintColor: theme ? colors.darkMode.textOnBackground : colors.lightMode.textOnPrimary,
  };
  return (
    <ProjectStack.Navigator screenOptions={dynamicScreenOptions}>
      <ProjectStack.Screen name="Projects" component={ProjectsScreen} />
      <ProjectStack.Screen name="Thoughts" component={ThoughtsScreen} />
    </ProjectStack.Navigator>
  );
};

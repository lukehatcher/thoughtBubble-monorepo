import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { ProjectsScreen } from '../ProjectsScreen';
import { ThoughtsScreen } from '../ThoughtsScreen';
import { ProjectStackParamList } from '../../interfaces/navigation';
import { ProjectsStackNavigatorProps } from '../../interfaces/componentProps';
import { colors } from '../../constants/colors';
import { RootState } from '../../reducers/rootReducer';

const ProjectStack = createStackNavigator<ProjectStackParamList>();

export const ProjectsStackNavigator: FC<ProjectsStackNavigatorProps> = () => {
  const theme = useSelector((state: RootState) => state.userInfo.darkMode);

  const dynamicScreenOptions = {
    headerStyle: {
      backgroundColor: theme ? colors.darkMode.dp1 : colors.lightMode.primary,
      // remove shadow
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTintColor: theme ? colors.darkMode.primary : colors.lightMode.textOnPrimary,
    headerTitleStyle: { color: 'white' }, // constant
  };

  return (
    <ProjectStack.Navigator screenOptions={dynamicScreenOptions}>
      <ProjectStack.Screen name="Projects" component={ProjectsScreen} />
      <ProjectStack.Screen name="Thoughts" component={ThoughtsScreen} />
    </ProjectStack.Navigator>
  );
};

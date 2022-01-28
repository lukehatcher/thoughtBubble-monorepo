import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProjectStackParamList, StatsStackParamList } from './navigation';

// typing react-navigation -> https://reactnavigation.org/docs/typescript/

export interface ProjectsScreenProps {
  navigation: StackNavigationProp<ProjectStackParamList, 'Projects'>;
}

export interface ThoughtScreenProps {
  route: RouteProp<ProjectStackParamList, 'Thoughts'>;
  navigation: StackNavigationProp<ProjectStackParamList, 'Projects'>;
}

export interface StatsHomeScreenProps {
  navigation: StackNavigationProp<StatsStackParamList, 'Analytics'>;
}

export interface StatsProjectInfoScreenProps {
  route: RouteProp<StatsStackParamList, 'Project Analytics'>;
  navigation: StackNavigationProp<StatsStackParamList, 'Analytics'>;
}

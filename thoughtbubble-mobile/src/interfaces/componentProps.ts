import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProjectStackParamList, StatsStackParamList } from './navigation';

export interface LoginScreenProps {}
export interface SettingsScreenProps {}
export interface AppNavTabsProps {}
export interface ProjectsStackNavigatorProps {}

export interface MoreModalProps {
  moreModalView: boolean;
  setMoreModalView: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  thoughtId: string;
}

export interface AddProjectModalProps {
  addProjModalView: boolean;
  setAddProjModalView: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddThoughtModalProps {
  projectId: string;
  addThoughtModalView: boolean;
  setAddThoughtModalView: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SortThoughtModalProps {
  projectId: string;
  sortModalView: boolean;
  setSortModalView: React.Dispatch<React.SetStateAction<boolean>>;
}

// for central projects/thoughts nav stack
// typing reactnavigation -> https://reactnavigation.org/docs/typescript/
export interface ProjectsScreenProps {
  navigation: StackNavigationProp<ProjectStackParamList, 'Projects'>;
}

export interface ThoughtScreenProps {
  route: RouteProp<ProjectStackParamList, 'Thoughts'>;
  navigation: StackNavigationProp<ProjectStackParamList, 'Projects'>;
}

// for stats nav stack
export interface StatsHomeScreenProps {
  navigation: StackNavigationProp<StatsStackParamList, 'StatsHome'>;
}

export interface StatsProjectInfoScreenProps {
  route: RouteProp<StatsStackParamList, 'StatsForProject'>;
  navigation: StackNavigationProp<StatsStackParamList, 'StatsHome'>;
}

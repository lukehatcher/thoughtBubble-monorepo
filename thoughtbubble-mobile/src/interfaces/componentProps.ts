import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './navigation';

export interface LoginScreenProps {}
export interface SettingsScreenProps {}
export interface AppNavTabsProps {}
export interface ProjectsNavStackProps {}

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

// typing reactnavigation -> https://reactnavigation.org/docs/typescript/
export interface ProjectsScreenProps {
  navigation: StackNavigationProp<StackParamList, 'Projects'>;
}

export interface ThoughtScreenProps {
  route: RouteProp<StackParamList, 'Thoughts'>;
  navigation: StackNavigationProp<StackParamList, 'Projects'>;
}

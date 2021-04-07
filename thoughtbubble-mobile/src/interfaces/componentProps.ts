import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './navigation';

export interface LoginScreenProps {}
export interface HomeScreenProps {}
export interface AppNavTabsProps {}
export interface ProjectsNavStackProps {}

export interface MoreModalProps {
  moreModalView: boolean;
  setMoreModalView: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  thoughtId: string;
}

// typing reactnavigation -> https://reactnavigation.org/docs/typescript/
export interface ProjectsScreenProps {
  navigation: StackNavigationProp<StackParamList, 'Projects'>;
}

export interface TodosScreenProps {
  route: RouteProp<StackParamList, 'Thoughts'>;
  navigation: StackNavigationProp<StackParamList, 'Projects'>;
}

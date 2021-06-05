import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProjectShape, ThoughtShape } from './data';
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

export interface ArchiveDeleteModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  focusedProjectId: string;
  focusedRowMap: any;
  focusedRowKey: string;
  closeRow: (rowMap: any, rowKey: string) => void;
}

export interface EmptyPlaceholderProps {
  isDarkMode: boolean;
  theme: any; // obj with many conditional style props
  displayTextLine1?: string;
  displayTextLine2?: string;
}

export interface ExpandableListItemProps {
  projectId: string;
  projectName: string;
  projectThoughts: ThoughtShape[];
}

export interface ProjectDisplaySettingsModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProjectListProps {
  userProjectsData: ProjectShape[];
  handleScroll: (...args: any[]) => void;
  isDarkMode: boolean;
}

export interface StackBackButtonProps {
  location: 'Projects' | 'Analytics';
  shadeBackground?: boolean;
}

export interface ThoughtsListProps {
  renderModal: (thoughtId: string) => void;
  isDarkMode: boolean;
  thoughts: ThoughtShape[];
  handleThoughtStatusChange: (thoughtId: string) => void;
  handleThoughtDelete: (thoughtId: string) => void;
  handleScroll: (...args: any[]) => void;
}

// ===== screen props =====

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
  navigation: StackNavigationProp<StatsStackParamList, 'Analytics'>;
}

export interface StatsProjectInfoScreenProps {
  route: RouteProp<StatsStackParamList, 'Project Analytics'>;
  navigation: StackNavigationProp<StatsStackParamList, 'Analytics'>;
}

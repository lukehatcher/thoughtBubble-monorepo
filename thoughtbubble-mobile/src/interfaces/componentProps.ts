import { ProjectShape, ThoughtShape } from './data';
import { Tags } from './stringLiteralTypes';

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
}

export interface ThoughtsListProps {
  renderModal: (thoughtId: string) => void;
  isDarkMode: boolean;
  thoughts: ThoughtShape[];
  handleThoughtStatusChange: (thoughtId: string) => void;
  handleThoughtDelete: (thoughtId: string) => void;
  handleScroll: (...args: any[]) => void;
}

export interface TagIconProps {
  tag: Tags; // Tags
  size: number;
  style?: any;
}

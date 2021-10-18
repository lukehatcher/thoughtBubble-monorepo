import { Tags } from '../constants/tags';

export interface ThoughtShape {
  id: string;
  // dates come in as string, they can be converted to type Date with `new Date(param)`
  createdDate: string;
  // lastUpdatedDate?: string; // not yet // idk its ever needed
  creationLocation: any; // Locations;
  projectId: string;
  text: string;
  completed: boolean;
  tag: Tags;
  // key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

export type Locations = 'mobile' | 'vscode';

export interface ProjectShape {
  id: string;
  createdDate: string;
  lastUpdatedDate: string;
  creationLocation: Locations; // Locations;
  archived: boolean;
  archivedDate: string; // actually a, iso date
  userId: string;
  projectName: string;
  projectThoughts: ThoughtShape[];
  completed: boolean;
  pinned: boolean;
  pinDate: string; // iso date
  // key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

import { UserInfoLoadingStatus } from './redux';
import { Direction, Locations, OrderType, Tags } from './stringLiteralTypes';

export interface UserInfoShape {
  // from query on User entity table
  id: string;
  email: string;
  username: string;
  githubId: string;
  dailyEmail: boolean;
  weeklyEmail: boolean;
  darkMode: boolean;
  projectOrder: OrderType;
  projectDirection: Direction;
  saveOrder: boolean;
  displayName: string;
  avatarUrl: string;
  loadingStatus: UserInfoLoadingStatus;
}

export interface ThoughtShape {
  id: string;
  // dates come in as string, they can be converted to type Date with `new Date(param)`
  createdDate: string;
  // lastUpdatedDate?: string; // not yet // idk its ever needed
  creationLocation: Locations;
  projectId: string;
  text: string;
  completed: boolean;
  tag: Tags;
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

export interface ThoughtSwipeListData {
  index: number;
  item: ThoughtShape;
  separators: any; // TODO: cant find any mention of this prop in the docs, likely from RN >_< https://github.com/jemise111/react-native-swipe-list-view
}

// shape of data in redux store && shape of data returned from api
export interface ProjectShape {
  id: string;
  createdDate: string;
  lastUpdatedDate: string;
  creationLocation: Locations;
  archived: boolean;
  archivedDate: string; // actually a, iso date
  userId: string;
  projectName: string;
  projectThoughts: ThoughtShape[];
  completed: boolean;
  pinned: boolean;
  pinDate: string; // iso date
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

// for ProjectList component
export interface ProjectSwipeListData {
  index: number;
  item: ProjectShape;
  separators: any; // TODO: cant find any mention of this prop in the docs, likely from RN >_< https://github.com/jemise111/react-native-swipe-list-view
}

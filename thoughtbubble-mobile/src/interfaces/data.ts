import { Direction, Locations, OrderType } from './stringLiteralTypes';

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
  status: string;
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
  tag: string | null;
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
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

export interface Activity {
  data: Array<{
    id: string;
    activityDate: string; // Date string
    userId: string; // not showing up for now
    projectId: string; // not showing up for now
  }>;
  graphData: Array<{ x: number; y: number }>; // data or all projects
  graphDataPerProject: { [key: string]: Array<{ x: number; y: number }> };
}

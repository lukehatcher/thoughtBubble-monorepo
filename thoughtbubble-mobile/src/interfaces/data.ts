import { Locations } from './stringLiteralTypes';

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
  userId: string;
  projectName: string;
  projectThoughts: ThoughtShape[];
  completed: boolean;
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

export interface Activity {
  data: Array<{
    id: string;
    activityDate: string; // Date string
    userId?: string; // not showing up for now
    projectId?: string; // not showing up for now
  }>;
  graphData: Array<{ x: number; y: number }>;
}

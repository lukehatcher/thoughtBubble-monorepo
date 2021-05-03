export interface ThoughtShape {
  id: string;
  createdDate: Date;
  projectId: string;
  text: string;
  completed: boolean;
  tag: string | null;
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

// shape of data in redux store && shape of data returned from api
export interface ProjectShape {
  id: string;
  createdDate: Date;
  userId: string;
  projectName: string;
  projectThoughts: ThoughtShape[];
  completed: boolean;
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

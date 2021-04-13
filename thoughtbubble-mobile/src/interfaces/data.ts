export interface ThoughtShape {
  // dup
  id: string;
  projectId: string;
  text: string;
  completed: boolean;
  tag: string | null;
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

// shape of data in redux store && shape of data returned from api
export interface ProjectShape {
  // dup
  id: string;
  userId: string;
  projectName: string;
  projectThoughts: ThoughtShape[];
  completed: boolean;
  key?: string; // used later for -> https://github.com/jemise111/react-native-swipe-list-view#usage
}

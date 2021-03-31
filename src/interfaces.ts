export interface ThoughtShape {
  _id: string;
  text: string;
  completed: boolean;
}

// shape of data in redux store
export interface ProjectShape {
  _id: string;
  projectName: string;
  todos: ThoughtShape[];
}

// data from GET request
export interface UserDataShape {
  _id: string;
  userSub: string;
  projects: ProjectShape[];
}

// data for vscode quickpick
export interface projectTuple {
  projectName: string;
  projectId: string;
}

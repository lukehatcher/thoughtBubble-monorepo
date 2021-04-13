export interface ThoughtShape {
  id: string;
  projectId: string;
  text: string;
  completed: boolean;
  tag: string | null;
}

// shape of data in redux store && shape of data returned from api
export interface ProjectShape {
  id: string;
  userId: number;
  projectName: string;
  projectThoughts: ThoughtShape[];
  completed: boolean;
}

// data for vscode quickpick
export interface projectTuple {
  projectName: string;
  projectId: string;
}

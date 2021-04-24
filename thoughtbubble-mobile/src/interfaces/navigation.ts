// typing reactnavigation -> https://reactnavigation.org/docs/typescript/

export type TabsParamList = {
  Settings: undefined;
  Projects: undefined;
  Stats: undefined;
};

export type StackParamList = {
  Projects: undefined;
  Thoughts: {
    projectId: string;
  };
};

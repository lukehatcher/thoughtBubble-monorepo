// typing reactnavigation -> https://reactnavigation.org/docs/typescript/

export type TabsParamList = {
  Home: undefined;
  Projects: undefined;
  Stats: undefined;
};

export type StackParamList = {
  Projects: undefined;
  Thoughts: {
    projectId: string;
  };
};

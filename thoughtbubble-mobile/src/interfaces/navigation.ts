// typing reactnavigation -> https://reactnavigation.org/docs/typescript/

export type TabsParamList = {
  Settings: undefined;
  Projects: undefined;
  Stats: undefined;
};

export type ProjectStackParamList = {
  Projects: undefined;
  Thoughts: {
    projectId: string;
  };
};

export type StatsStackParamList = {
  StatsHome: undefined;
  StatsForProject: {
    projectId: string;
  };
};

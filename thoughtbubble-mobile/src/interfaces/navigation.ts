// typing reactnavigation -> https://reactnavigation.org/docs/typescript/

export type TabsParamList = {
  Settings: undefined;
  Projects: undefined;
  Stats: undefined;
  Archive: undefined;
};

export type ProjectStackParamList = {
  Projects: undefined;
  Thoughts: {
    projectId: string;
  };
};

export type StatsStackParamList = {
  Analytics: undefined;
  'Project Analytics': {
    projectId: string;
  };
};

export interface StatsStackNavigatorProps {}
export interface AppNavTabsProps {}
export interface ProjectsStackNavigatorProps {}

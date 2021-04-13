export interface ThoughtShape {
  // dup
  id: string;
  projectId: string;
  text: string;
  completed: boolean;
  tag: string | null;
}

// shape of data in redux store && shape of data returned from api
export interface ProjectShape {
  // dup
  id: string;
  userId: number;
  projectName: string;
  projectThoughts: ThoughtShape[];
  completed: boolean;
}

export interface ThoughtCardProps {
  projectId: string;
  thoughtId: string;
  thought: ThoughtShape;
}

export interface ProjectCardProps {
  project: ProjectShape;
}

export interface GithubIdTokenShape {
  login: string;
  id: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: string;
  public_gists: string;
  followers: string;
  following: string;
  created_at: string;
  updated_at: string;
}

import { ProjectShape, ThoughtShape } from './interfaces';

export interface LogoutButtonProps {
  id?: string;
}

export interface ThoughtCardProps {
  projectId: string;
  thoughtId: string;
  thought: ThoughtShape;
}

export interface ProjectCardProps {
  project: ProjectShape;
}

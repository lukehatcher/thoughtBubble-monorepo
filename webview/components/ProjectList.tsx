import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { ProjectCard } from './ProjectCard';

export const ProjectList: React.FC = () => {
  const projectSelector = (state: RootState) => state.userData; // need to type userdata
  const userProjects = useSelector(projectSelector);

  return (
    <div id="projectList-container">
      {userProjects.map((project) => (
        <ProjectCard project={project} key={project._id} />
      ))}
    </div>
  );
};

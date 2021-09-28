import * as React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { ProjectCard } from './ProjectCard';
import { ProjectsHeader } from './ProjectsHeader';

export const ProjectPage: FC = () => {
  const projectSelector = (state: RootState) => state.userProjectData; // need to type userdata
  const userProjects = useSelector(projectSelector);

  return (
    <>
      <header id="main-header">
        <ProjectsHeader />
      </header>
      <div id="projectList-container">
        {userProjects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </>
  );
};

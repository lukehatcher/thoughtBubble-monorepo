import * as React from 'react';
import { FC } from 'react';
import { useSelector } from 'react-redux';
// import { useOrderProjects } from '../hooks/useOrderProjects';
import { RootState } from '../reducers/rootReducer';
import { LoginButton } from './LoginButton';
import { ProjectCard } from './ProjectCard';
import { ProjectsHeader } from './ProjectsHeader';

export const ProjectPage: FC = () => {
  const userProjects = useSelector((state: RootState) => state.userProjectData);
  // const userProjects = useOrderProjects();
  const token = useSelector((state: RootState) => state.token);

  return (
    <>
      {!token ? (
        <>
          {' '}
          <LoginButton />
        </>
      ) : (
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
      )}
    </>
  );
};

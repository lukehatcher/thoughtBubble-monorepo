import * as React from 'react';
import { useSelector } from 'react-redux';
import { ProjectList } from './ProjectList';
import { RootState } from '../reducers/rootReducer';
import { LogoutButton } from './LogoutButton';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { LoginButton } from './LoginButton';
import { ProjectsHeader } from './ProjectsHeader';
import { Test } from './Test';

export const App: React.FC = () => {
  const selector = (state: RootState) => state.userData;
  const loginStatus = useSelector(selector);

  if (!loginStatus) {
    return (
      <>
        <LoginButton />
      </>
    );
  }
  return (
    <>
      <header id="main-header">
        <ProjectsHeader />
      </header>
      <ul>
        <li>
          <Link to="/testing">test link</Link>
        </li>
        <li>
          <Link to="/projectList">see your projects</Link>
        </li>
        <li>
          <Link to="/home">home</Link>
        </li>
      </ul>
    </>
  );
};

import * as React from 'react';
import { useSelector } from 'react-redux';
import { ProjectList } from './ProjectList';
import { RootState } from '../reducers/rootReducer';
import { LogoutButton } from './LogoutButton';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { LoginButton } from './LoginButton';

export const HomePage: React.FC = () => {
  const loginSelector = (state: RootState) => state.userData;
  const userSelector = (state: RootState) => state.storedUser;
  const loginStatus = useSelector(loginSelector);

  const user = useSelector(userSelector);
  let pic;
  let username;
  let name;
  if (loginStatus && user) {
    pic = user.avatar_url;
    username = user.login;
    name = user.name;
  }

  if (!loginStatus) {
    return (
      <>
        <LoginButton />
      </>
    );
  }
  return (
    <>
      <h3>{`welcome ${name}, (${username})`}</h3>
      <img src={pic} alt="user's github profile pic" width="200" height="200" />
      <ul>
        <li>
          <Link to="/testing">test link</Link>
        </li>
        <li>
          <Link to="/projectList">see your projects</Link>
        </li>
      </ul>
    </>
  );
};

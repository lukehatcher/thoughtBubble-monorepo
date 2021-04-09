import * as React from 'react';
import { useSelector } from 'react-redux';
import { ProjectList } from './ProjectList';
import { RootState } from '../reducers/rootReducer';
import { LogoutButton } from './LogoutButton';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { LoginButton } from './LoginButton';
import { VscSettingsGear, VscBook } from 'react-icons/vsc';

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
    <div id="home-container">
      <nav id="home-nav-container">
        <div className="home-nav-item">
          <VscBook size="1.5em" />
          &nbsp;&nbsp;
          <Link to="/projectList" className="home-nav-link">
            projects
          </Link>
        </div>
        <div className="home-nav-item">
          <VscSettingsGear size="1.5em" />
          &nbsp;&nbsp;
          <Link to="/settings" className="home-nav-link">
            settings
          </Link>
        </div>
      </nav>
      <div id="home-main-container">
        <header>
          <h3>{`welcome ${name}, (${username})`}</h3>
          <img src={pic} id="user-img" alt="user's github profile pic" />
        </header>
      </div>
    </div>
  );
};

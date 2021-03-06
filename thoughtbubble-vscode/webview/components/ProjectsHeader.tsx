import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addProjectAction, deleteProjectAction } from '../actions/projectActions';
import { RootState } from '../reducers/rootReducer';
import { VscNewFolder, VscCloudUpload, VscEdit, VscTrash, VscRefresh, VscSettingsGear } from 'react-icons/vsc';
import Popup from 'reactjs-popup';
import { LogoutButton } from './LogoutButton';
import { Link } from 'react-router-dom';
import { routerLocations } from '../constants/routerLocations';

export const ProjectsHeader: React.FC = function () {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const selector = (state: RootState) => state.userProjectData;
  const userData = useSelector(selector);

  const handleProjectAddition = function (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (input) dispatch(addProjectAction(input.trim()));
    setInput('');
  };

  const handleProjectDeletion = function (projectId: string): void {
    if (projectId) dispatch(deleteProjectAction(projectId));
  };

  const handleExtRefresh = function (): void {
    vscodeGlobal.postMessage({
      command: 'refreshExt',
      value: null,
    });
  };

  return (
    <Container>
      {/* create new project submenu popup */}
      <Popup
        // contentStyle={{ border: '2px solid #AAB2C0', borderRadius: '10px' }}
        trigger={
          <div className="submenu-trigger">
            <VscNewFolder size="2em" />
          </div>
        }
        position="right top"
        on="hover"
        mouseLeaveDelay={100}
        mouseEnterDelay={100}
        arrow={false}
        nested
      >
        <form className="menu-item bottom-corners" onSubmit={(e) => handleProjectAddition(e)}>
          <VscEdit size="1em" color="#AAB2C0" />
          <input
            className="edit-thought-input"
            type="text"
            value={input}
            placeholder="create new project"
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="edit-thought-submit" type="submit">
            <VscCloudUpload size="1.5em" />
          </button>
        </form>
      </Popup>
      {/* delete a project dropdown */}
      <Popup
        trigger={
          <div className="submenu-trigger">
            <VscTrash size="2em" />
          </div>
        }
        position="right top"
        on="hover"
        mouseLeaveDelay={100}
        mouseEnterDelay={100}
        arrow={false}
        nested
      >
        {/* need to add top-corners bottom-corners classes */}
        <>
          <div className="menu-item top-corners">click on a project to delete it</div>
          {userData.map((proj) => (
            <div className="menu-item" key={proj.id} onClick={() => handleProjectDeletion(proj.id)}>
              {proj.projectName}
            </div>
          ))}
        </>
      </Popup>
      {/* <div style={{ alignItems: 'center', justifyContent: 'center' }}> */}
      {/* </div> */}
      <div className="submenu-trigger" onClick={() => handleExtRefresh()}>
        <VscRefresh size="2em" />
      </div>
      {/* <Link to={routerLocations.SETTINGS} style={{ color: '#AAB2C0' }}> */}
      <Link to={routerLocations.SETTINGS} style={{ color: '#AAB2C0' }}>
        <VscSettingsGear size="2em" />
      </Link>
      <LogoutButton id="logout-btn-projects" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

import * as React from 'react';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addThoughtAction } from '../actions/thoughtActions';
import { ProjectCardProps } from '../interfaces/componentProps';
import { ThoughtCard } from './ThoughtCard';
import { Popup } from 'reactjs-popup';
import { fetchDataAction } from '../actions/fetchDataAction';
import { RootState } from '../reducers/rootReducer';
import { filtertThoughtsAction } from '../actions/filterActions';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import {
  VscCloudUpload,
  VscFilter,
  VscNewFile,
  VscSettings,
  VscArrowUp,
  VscArrowDown,
  VscRefresh,
  VscPackage,
  VscSymbolKey,
  VscCalendar,
  VscPinned,
  VscKebabVertical,
} from 'react-icons/vsc';
import { Directions, OrderTypes } from '../constants/orders';
import { pinProjectAction } from '../actions/projectActions';
import styled from 'styled-components';
import { UserInfoActionTypes } from '../constants/actionTypes';
import { changeProjectDirectionAction, changeProjectOrderAction } from '../actions/userInfoActions';

export const ProjectCard: FC<ProjectCardProps> = function ({ project }) {
  const { projectName, id: projectId } = project;
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  console.log(userInfo);
  // ==============
  const order = useSelector((state: RootState) => state.userInfo.projectOrder);
  const saveOrderSetting = useSelector((state: RootState) => state.userInfo.saveOrder);
  const direction = useSelector((state: RootState) => state.userInfo.projectDirection);
  // ==============

  const handleNewThought = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input) dispatch(addThoughtAction(projectId, input.trim()));
    setInput('');
  };

  const handleThoughtFilter = (filterType: string): void => {
    switch (filterType) {
      case 'completed':
        dispatch(filtertThoughtsAction(projectId, 'completed'));
        return;
      case 'incomplete':
        dispatch(filtertThoughtsAction(projectId, 'incomplete'));
        return;
      case 'all':
        dispatch(fetchDataAction());
        return;
    }
  };

  /**
   * change the projects to be sorted by alphabet, size or update date
   */
  const handleOrderTypeChange = (newOrder: OrderTypes): void => {
    // dispatch an action that changes how the projects are displayed
    if (newOrder === order) return;
    if (saveOrderSetting) {
      // save setting is ON, so need to update DB + redux store
      dispatch(changeProjectOrderAction(newOrder));
    } else {
      // save setting is OFF so just update redux store and not the DB
      dispatch({ type: UserInfoActionTypes.UPDATE_ORDER, payload: newOrder });
    }
  };

  /**
   * change the projects to be sorted in ascending or descending order
   */
  const handleDirectionChange = (newDirection: Directions): void => {
    if (direction == newDirection) return;
    if (saveOrderSetting) {
      // save setting is ON, so need to update DB + redux store
      dispatch(changeProjectDirectionAction(newDirection));
    } else {
      // save setting is OFF so just update redux store and not the DB
      dispatch({ type: UserInfoActionTypes.UPDATE_DIRECTION, payload: newDirection });
    }
  };

  const handleProjectPin = (projectId: string) => {
    // handles both pin and unpin
    dispatch(pinProjectAction(projectId));
  };

  return (
    <div className="projectCard-container">
      <h1 style={{ color: '#BB86FC' }}>{projectName}</h1>
      <div className="proj-title-container">
        {/* show that the project is pinned */}
        {project.pinned ? (
          <ButtonContainer onClick={() => handleProjectPin(projectId)}>
            <VscPinned size="1.5em" color="red" />
          </ButtonContainer>
        ) : (
          <></>
        )}
        {/* filter thoughts popup */}
        <Popup
          trigger={
            <div className="submenu-trigger">
              <VscFilter size="1.5em" />
            </div>
          }
          position="right top"
          on="hover"
          mouseLeaveDelay={100}
          mouseEnterDelay={100}
          arrow={false}
          nested
        >
          <div className="menu-item top-corners" onClick={() => handleThoughtFilter('completed')}>
            <AiOutlineCheckCircle size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; show completed
          </div>
          <div className="menu-item" onClick={() => handleThoughtFilter('incomplete')}>
            <AiOutlineCloseCircle size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; show incomplete
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleThoughtFilter('all')}>
            <VscRefresh size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; view all
          </div>
        </Popup>
        {/* sort items popup */}
        <Popup
          trigger={
            <div className="submenu-trigger">
              <VscSettings size="1.5em" />
            </div>
          }
          position="right top"
          on="hover"
          mouseLeaveDelay={100}
          mouseEnterDelay={100}
          arrow={false}
          nested
        >
          <div className="menu-item top-corners" onClick={() => handleOrderTypeChange(OrderTypes.ALPHABETICAL)}>
            <VscSymbolKey size="1em" color={'white'} />
            &nbsp;&nbsp; sort alphabeticaly
          </div>
          <div className="menu-item" onClick={() => handleOrderTypeChange(OrderTypes.SIZE)}>
            <VscPackage size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; sort by size
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleOrderTypeChange(OrderTypes.LAST_UPDATED)}>
            <VscCalendar size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; sort by update date
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleDirectionChange(Directions.ASC)}>
            <VscArrowUp size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; ascending
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleDirectionChange(Directions.DESC)}>
            <VscArrowDown size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; descending
          </div>
        </Popup>

        {/* add thought popup */}
        <Popup
          trigger={
            <div className="submenu-trigger">
              <VscNewFile size="1.5em" />
            </div>
          }
          position="right top"
          on="hover"
          mouseLeaveDelay={100}
          mouseEnterDelay={100}
          arrow={false}
          nested
        >
          <form className="menu-item menu-item-override" onSubmit={(e) => handleNewThought(e)}>
            <textarea
              className="new-thought-input"
              value={input}
              placeholder={`add a new thought...`}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="edit-thought-submit" type="submit">
              <VscCloudUpload size="2em" />
            </button>
          </form>
        </Popup>
        {/* settings button */}
        <Popup
          trigger={
            <div className="submenu-trigger">
              <VscKebabVertical size="1.5em" />
            </div>
          }
          position="right top"
          on="hover"
          mouseLeaveDelay={100}
          mouseEnterDelay={100}
          arrow={false}
          nested
        >
          <ButtonContainer className="menu-item" onClick={() => handleProjectPin(projectId)}>
            {/* TODO: pin project */}
            <VscPinned size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; {project.pinned ? 'unpin' : 'pin'} project
          </ButtonContainer>
        </Popup>
      </div>
      {/* display the actual thoughts */}
      {project.projectThoughts.map((thought) => (
        <ThoughtCard thought={thought} key={thought.id} projectId={projectId} thoughtId={thought.id} />
      ))}
    </div>
  );
};

const ButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

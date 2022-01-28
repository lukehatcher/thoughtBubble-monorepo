import * as React from 'react';
import { FC, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addThoughtAction } from '../actions/thoughtActions';
import { ProjectCardProps } from '../interfaces/componentProps';
import { ThoughtCard } from './ThoughtCard';
import { Popup } from 'reactjs-popup';
import { RootState } from '../reducers/rootReducer';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { Directions, OrderTypes } from '../constants/orders';
import { Status } from '../constants/status';
import { filterProjectAction, pinProjectAction } from '../actions/projectActions';
import styled from 'styled-components';
import { UserInfoActionTypes } from '../constants/actionTypes';
import { changeProjectDirectionAction, changeProjectOrderAction } from '../actions/userInfoActions';
import { Tags, Tag } from '../constants/tags';
import { clearTagsAction, updateFiltersAction } from '../actions/filterActions';
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
  VscTag,
  VscStarFull,
  VscEye,
} from 'react-icons/vsc';

export const ProjectCard: FC<ProjectCardProps> = function ({ project }) {
  // used to set CSS for the hover effects of the project container as well as the show the close button on a project if its open
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { projectName, id: projectId } = project;
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.userInfo.projectOrder);
  const direction = useSelector((state: RootState) => state.userInfo.projectDirection);
  const saveOrderSetting = useSelector((state: RootState) => state.userInfo.saveOrder);
  const tbGrey = '#AAB2C0';
  const filters = useSelector((state: RootState) => state.filters);
  const thoughtListRef = useRef<HTMLDivElement>(null);
  // get the total number of thoughts this project has (used to calculate the height of the expandable/collapsible)
  const thoughtCount =
    useSelector(
      (state: RootState) => state.userProjectData.find((proj) => proj.id === projectId)?.projectThoughts.length,
    ) ?? 0;

  const handleNewThought = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input) dispatch(addThoughtAction(projectId, input.trim()));
    setInput('');
  };

  // this function is same as the one in RN (except for the enum types)
  const handleThoughtFilter = async function (typeOfFilter: Tags | Status) {
    await dispatch(updateFiltersAction(projectId, typeOfFilter));
    await dispatch(filterProjectAction(projectId, filters)); // do I HAVE to pass filters here?
  };

  const handleClearTags = async function () {
    await dispatch(clearTagsAction(projectId));
    await dispatch(filterProjectAction(projectId, filters));
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
   * NOTE: this function version is different from the RN version as this is not a switch
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

  const highlightOrder = (orderOption: OrderTypes): boolean => {
    return orderOption === order;
  };

  const highlightDirection = (directionOption: Directions): boolean => {
    return directionOption === direction;
  };

  const [hasOpened, setHasOpened] = useState<boolean>(false);
  /**
   * opens/closes project
   */
  const showThoughtLists = (): void => {
    if (!thoughtListRef.current) return; // might be undefined first time cause of null initial ref status
    setHasOpened(true);
    if (thoughtListRef.current.style.height) {
      thoughtListRef.current.style.height = ''; // 0px in css equates to '' in js
      setIsOpen(false);
    } else {
      // thoughtListRef.current.style.height = '100%';
      // animations dont work but resize on add and delete works
      // thoughtListRef.current.style.height = 'auto';
      // animation works but no resize on add or delete
      // thoughtListRef.current.style.height = thoughtListRef.current.scrollHeight + 'px';
      // trying to calculate height
      thoughtListRef.current.style.height = (thoughtCount * 100).toString() + 'px';
      setIsOpen(true);
    }
  };

  /**
   * calculate the height of all the thoughts
   */
  const calcHeight = (): string => {
    // TODO: not actually 100px -> edit the CSS so the height is const for each addition
    return hasOpened ? (thoughtCount * 100).toString() + 'px' : '';
  };

  return (
    <div
      className={isOpen ? 'projectCard-container--open' : 'projectCard-container--closed'}
      onClick={isOpen ? () => undefined : showThoughtLists}
    >
      {isOpen ? <button onClick={showThoughtLists}> &#10005;</button> : <></>}
      <h1 style={{ color: '#BB86FC' }}>{projectName}</h1>
      {/* =============================== */}
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
          <div className="menu-item top-corners" onClick={() => handleThoughtFilter(Status.COMPLETED)}>
            <AiOutlineCheckCircle size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; show completed
          </div>
          <div className="menu-item" onClick={() => handleThoughtFilter(Status.INCOMPLETE)}>
            <AiOutlineCloseCircle size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; show incomplete
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleThoughtFilter(Status.ALL)}>
            <VscEye size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; view all
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleThoughtFilter(Tag.RED)}>
            <VscTag size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; red tags
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleThoughtFilter(Tag.ORANGE)}>
            <VscTag size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; orange tags
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleThoughtFilter(Tag.GREEN)}>
            <VscTag size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; green tags
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleThoughtFilter(Tag.BLUE)}>
            <VscTag size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; blue tags
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleThoughtFilter(Tag.PURPLE)}>
            <VscTag size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; purple tags
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleThoughtFilter(Tag.FAVORITE)}>
            <VscStarFull size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; favorites
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleClearTags()}>
            <VscRefresh size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; remove all tags
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
            <VscSymbolKey size="1em" color={highlightOrder(OrderTypes.ALPHABETICAL) ? 'red' : tbGrey} />
            &nbsp;&nbsp; sort alphabeticaly
          </div>
          <div className="menu-item" onClick={() => handleOrderTypeChange(OrderTypes.SIZE)}>
            <VscPackage size="1em" color={highlightOrder(OrderTypes.SIZE) ? 'red' : tbGrey} />
            &nbsp;&nbsp; sort by size
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleOrderTypeChange(OrderTypes.LAST_UPDATED)}>
            <VscCalendar size="1em" color={highlightOrder(OrderTypes.LAST_UPDATED) ? 'red' : tbGrey} />
            &nbsp;&nbsp; sort by update date
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleDirectionChange(Directions.ASC)}>
            <VscArrowUp size="1em" color={highlightDirection(Directions.ASC) ? 'red' : tbGrey} />
            &nbsp;&nbsp; ascending
          </div>
          <div className="menu-item bottom-corners" onClick={() => handleDirectionChange(Directions.DESC)}>
            <VscArrowDown size="1em" color={highlightDirection(Directions.DESC) ? 'red' : tbGrey} />
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
              placeholder="add a new thought..."
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
            <VscPinned size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; {project.pinned ? 'unpin' : 'pin'} project
          </ButtonContainer>
        </Popup>
      </div>
      {/* ====== display the actual thoughts ====== */}
      <div className="collapsible-thoughts" ref={thoughtListRef} style={{ height: calcHeight() }}>
        {project.projectThoughts.map((thought) => (
          <ThoughtCard thought={thought} key={thought.id} projectId={projectId} thoughtId={thought.id} />
        ))}
      </div>
    </div>
  );
};

const ButtonContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

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
} from 'react-icons/vsc';
import { Directions, OrderTypes } from '../constants/orders';

export const ProjectCard: FC<ProjectCardProps> = function ({ project }) {
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();
  const { projectName, id: projectId } = project;

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

  const handleProjectSort = (direction: Directions, sort: OrderTypes) => {
    // dispatch({ type: 'sortProject', payload: projectId });
  };

  return (
    <div className="projectCard-container">
      <h1 style={{ color: '#BB86FC' }}>{projectName}</h1>
      <div className="proj-title-container">
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
          <div
            className="menu-item top-corners"
            onClick={() => handleProjectSort(Directions.ASC, OrderTypes.ALPHABETICAL)}
          >
            <VscSymbolKey size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; sort alphabeticaly
          </div>
          <div className="menu-item" onClick={() => handleProjectSort(Directions.ASC, OrderTypes.SIZE)}>
            <VscPackage size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; sort by size
          </div>
          <div
            className="menu-item bottom-corners"
            onClick={() => handleProjectSort(Directions.ASC, OrderTypes.LAST_UPDATED)}
          >
            <VscCalendar size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; sort by update date
          </div>
          <div
            className="menu-item bottom-corners"
            onClick={() => handleProjectSort(Directions.ASC, OrderTypes.ALPHABETICAL)}
          >
            <VscArrowUp size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; low to high
          </div>
          <div
            className="menu-item bottom-corners"
            onClick={() => handleProjectSort(Directions.ASC, OrderTypes.ALPHABETICAL)}
          >
            <VscArrowDown size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; high to low
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
      </div>
      {/* display the actual thoughts */}
      {project.projectThoughts.map((thought) => (
        <ThoughtCard thought={thought} key={thought.id} projectId={projectId} thoughtId={thought.id} />
      ))}
    </div>
  );
};

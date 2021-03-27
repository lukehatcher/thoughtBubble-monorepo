import * as React from 'react';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addThoughtAction } from '../actions/thoughtActions';
import { ProjectCardProps } from '../interfaces/interfaces';
import { ThoughtCard } from './ThoughtCard';
import { Popup } from 'reactjs-popup';
import { fetchDataAction } from '../actions/fetchDataAction';
import { RootState } from '../reducers/rootReducer';
import { filtertThoughtsAction } from '../actions/filterActions';
import { VscCloudUpload, VscFilter, VscNewFile } from 'react-icons/vsc';
import { AiOutlineCloseCircle, AiOutlineCheckCircle, AiOutlineReload } from 'react-icons/ai';

export const ProjectCard: FC<ProjectCardProps> = function ({ project }) {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { projectName, _id: projectId } = project;
  const selector = (state: RootState) => state.storedUser!.id; // TS non-null-assertion-operator
  const userSub = `github|${useSelector(selector)}`;

  const handleNewThought = function (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (input) dispatch(addThoughtAction(projectId, input.trim()));
    setInput('');
  };

  const handleThoughtFilter = function (filterType: string): void {
    console.log('hgduial');
    switch (filterType) {
      case 'completed':
        dispatch(filtertThoughtsAction(projectId, 'completed'));
        return;
      case 'incomplete':
        dispatch(filtertThoughtsAction(projectId, 'incomplete'));
        return;
      case 'all':
        dispatch(fetchDataAction(userSub));
        return;
    }
  };

  return (
    <div className="projectCard-container">
      <h1 style={{ color: '#6200EE' }}>{projectName}</h1>
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
            <AiOutlineReload size="1em" color="#AAB2C0" />
            &nbsp;&nbsp; view all
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
      {project.todos.map((thought) => (
        <ThoughtCard thought={thought} key={thought._id} projectId={projectId} thoughtId={thought._id} />
      ))}
    </div>
  );
};

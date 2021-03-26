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
      <h1 style={styles.h1}>{projectName}</h1>
      <form onSubmit={(e) => handleNewThought(e)}>
        <input
          type="text"
          value={input}
          placeholder={`add a new thought to "${projectName}"...`}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button type="submit">add new thought</button>
      </form>
      <Popup
        trigger={<div className="submenu-trigger">filter</div>}
        position="right top"
        on="hover"
        mouseLeaveDelay={100}
        mouseEnterDelay={100}
        arrow={false}
        nested
      >
        <div className="menu-item" onClick={() => handleThoughtFilter('completed')}>
          completed
        </div>
        <div className="menu-item" onClick={() => handleThoughtFilter('incomplete')}>
          incomplete
        </div>
        <div className="menu-item" onClick={() => handleThoughtFilter('all')}>
          view all
        </div>
      </Popup>
      {project.todos.map((thought) => (
        <ThoughtCard thought={thought} key={thought._id} projectId={projectId} thoughtId={thought._id} />
      ))}
    </div>
  );
};

const styles = {
  h1: {
    color: '#6200EE',
  },
};

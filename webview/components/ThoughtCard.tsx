import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from 'reactjs-popup';
import { fetchDataAction } from '../actions/fetchDataAction';
import { deleteThoughtAction, editThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { ThoughtCardProps } from '../interfaces/interfaces';
import { RootState } from '../reducers/rootReducer';

export const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought, projectId, thoughtId }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleThoughtDeletion = function (): void {
    dispatch(deleteThoughtAction(projectId, thoughtId));
  };

  const handleThoughtToggle = function (): void {
    dispatch(thoughtStatusChangeAction(projectId, thoughtId));
  };

  const handleThoughtEdit = function (): void {
    if (input) dispatch(editThoughtAction(input, projectId, thoughtId));
    setInput('');
  };

  const handleThoughtTag = function (): void {
    // dispath action\
    // coming soon
  };

  return (
    <div>
      <div>{thought.text}</div>
      <div>{thought.completed ? 'completed' : 'in progress'}</div>
      <Popup
        trigger={<div className="submenu-trigger">more</div>}
        position="right top"
        on="hover"
        mouseLeaveDelay={100}
        mouseEnterDelay={100}
        // contentStyle={{ padding: '0px', border: 'none' }}
        arrow={false}
        nested
      >
        <div className="menu-item" onClick={() => handleThoughtDeletion()}>
          delete thought
        </div>
        <div className="menu-item" onClick={() => handleThoughtToggle()}>
          toggle thought
        </div>
        <div className="menu-item" onClick={() => handleThoughtTag()}>
          tag (coming soon)
        </div>
        <form className="menu-item" onSubmit={() => handleThoughtEdit()}>
          <input type="text" value={input} placeholder="edit thought" onChange={(e) => setInput(e.target.value)} />
          <button type="submit">submit</button>
        </form>
      </Popup>
    </div>
  );
};

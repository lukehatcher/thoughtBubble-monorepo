import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from 'reactjs-popup';
import { deleteThoughtAction, editThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { ThoughtCardProps } from '../interfaces/interfaces';
import { VscEllipsis } from 'react-icons/vsc';

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
    // dispath action
    // coming soon
  };
  return (
    <div className="thoughtCard-container">
      <p className={thought.completed ? 'completed-text' : 'incomplete-text'}>{thought.text}</p>
      <Popup
        trigger={
          <div className="submenu-trigger">
            <VscEllipsis size="2em" />
          </div>
        }
        position="right top"
        on="hover"
        mouseLeaveDelay={100}
        mouseEnterDelay={100}
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

import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Popup } from 'reactjs-popup';
import { deleteThoughtAction, editThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { ThoughtCardProps } from '../interfaces/interfaces';

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

  return (
    <div>
      <div>{thought.text}</div>
      <div>{thought.completed ? 'completed' : 'in progress'}</div>
      <div className="menu">
        <Popup
          trigger={<div className="menu-item">more menu</div>}
          position="right top"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: '0px', border: 'none' }}
          arrow={false}
        >
          <div className="menu">
            <button className="menu-item" onClick={() => handleThoughtDeletion()}>
              delete thought
            </button>
            <button className="menu-item" onClick={() => handleThoughtToggle()}>
              toggle thought
            </button>
            <form className="menu-item" onSubmit={() => handleThoughtEdit()}>
              <input
                type="text"
                value={input}
                placeholder="edit thought"
                onChange={(e) => setInput(e.target.value)}
              ></input>
              <button type="submit">submit edit</button>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
};

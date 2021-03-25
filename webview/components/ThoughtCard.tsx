import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteThoughtAction, thoughtStatusChangeAction } from '../actions/thoughtActions';
import { ThoughtCardProps } from '../interfaces/interfaces';

export const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought, projectId, thoughtId }) => {
  const dispatch = useDispatch();

  const handleThoughtDeletion = function (): void {
    dispatch(deleteThoughtAction(projectId, thoughtId));
  };

  const handleThoughtToggle = function (): void {
    dispatch(thoughtStatusChangeAction(projectId, thoughtId));
  };

  return (
    <div>
      <div>{thought.text}</div>
      <div>{thought.completed ? 'completes' : 'in progress'}</div>
      <button className="thought-del-btn" onClick={() => handleThoughtDeletion()}>
        delete thought
      </button>
      <button className="thought-toggle-btn" onClick={() => handleThoughtToggle()}>
        toggle thought
      </button>
    </div>
  );
};

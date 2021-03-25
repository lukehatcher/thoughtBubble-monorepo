import * as React from 'react';
import { ThoughtCardProps } from '../interfaces/interfaces';

export const ThoughtCard: React.FC<ThoughtCardProps> = ({ thought, thoughtId }) => {
  return (
    <div>
      <div>{thought.text}</div>
      <div>{thought.completed ? 'completes' : 'in progress'}</div>
      <button className="thought-del-btn" onClick={() => {}}>
        delete thought
      </button>
      <button className="thought-toggle-btn" onClick={() => {}}>
        toggle thought
      </button>
    </div>
  );
};

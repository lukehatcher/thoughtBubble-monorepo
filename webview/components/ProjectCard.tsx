import * as React from 'react';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addThoughtAction } from '../actions/thoughtActions';
import { ProjectCardProps } from '../interfaces/interfaces';
import { ThoughtCard } from './ThoughtCard';

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { projectName, _id: projectId } = project;

  const handleNewThought = function (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (input) dispatch(addThoughtAction(projectId, input.trim()));
    setInput('');
  };

  return (
    <div>
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

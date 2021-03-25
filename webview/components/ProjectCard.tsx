import * as React from 'react';
import { FC, useState } from 'react';
import { ProjectCardProps } from '../interfaces/interfaces';
import { ThoughtCard } from './ThoughtCard';

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
	const [input, setInput] = useState('');

	const handleNewThought = function(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(input);
		setInput('');
	};

	return (
		<div>
			<h1 style={styles.h1}>{project.projectName}</h1>
			<form onSubmit={(e) => handleNewThought(e)}>
				<input type="text" placeholder="add a thought..." onChange={(e) => setInput(e.target.value)}></input>
				<button type="submit"></button>
			</form>
			{project.todos.map((thought) => (
				<ThoughtCard thought={thought} key={thought._id} />
			))}
		</div>
	);
};

const styles = {
	h1: {
		'text-align': 'center',
		color: '#6200EE',
	}
};

import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { ThoughtCard } from './ThoughtCard';

export const ProjectList = () => {
	const projectSelector = (state: RootState) => state.userData; // need to type userdata
	const userProjects = useSelector(projectSelector);

	return (
		<div>
			{userProjects.map((project) => (
				<div key={project._id}>
					<h1>{project.projectName}</h1>
					{project.todos.map((thought) => (
						<ThoughtCard thought={thought} />
					))}
				</div>
			))}
		</div>
	);
};

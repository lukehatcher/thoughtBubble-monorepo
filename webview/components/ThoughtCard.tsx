import * as React from 'react';
import { FC } from 'react';
import { ThoughtCardProps } from '../interfaces/interfaces';

export const ThoughtCard: FC<ThoughtCardProps> = ({ thought }) => {
	return (
		<div>
			<div>{thought.text}</div>
			<div>{thought.completed ? 'completes' : 'in progress'}</div>
		</div>
	);
};

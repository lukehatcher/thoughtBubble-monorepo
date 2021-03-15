import * as React from 'react';
import { FC } from 'react';
import { ThoughtType } from '../interfaces/interfaces';

interface thoughtCardProps {
	thought: ThoughtType;
}

export const ThoughtCard: FC<thoughtCardProps> = ({ thought }) => {
	return (
		<div>
		 	<div>{thought.text}</div>
		 	<div>{thought.completed ? 'completes' : 'in progress'}</div>
		</div>
	)
}

import * as React from 'react';
import { FC } from 'react';
import { ThoughtShape } from '../interfaces/interfaces';

interface thoughtCardProps {
	thought: ThoughtShape;
}

export const ThoughtCard: FC<thoughtCardProps> = ({ thought }) => {
	return (
		<div>
		 	<div>{thought.text}</div>
		 	<div>{thought.completed ? 'completes' : 'in progress'}</div>
		</div>
	)
}

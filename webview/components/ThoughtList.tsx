import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';

export const ThoughtList = () => {
	const select = (state: RootState) => state.userData;
	const userData = useSelector(select);

	return (
		<div>
			{JSON.stringify(userData)}
		</div>
	);
};

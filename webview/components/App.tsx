import * as React from 'react';
import { useSelector } from 'react-redux';
import { ProjectList } from './ProjectList';
import { RootState } from '../reducers/rootReducer';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';

export const App: React.FC = () => {
	const selector = (state: RootState) => state.userData;
  const loginStatus = useSelector(selector);

	if (!loginStatus) {
		return (
			<>
				<LoginButton />
			</>
		);
	}
	return (
		<>
			<LogoutButton />
			<ProjectList />
		</>
	);
};

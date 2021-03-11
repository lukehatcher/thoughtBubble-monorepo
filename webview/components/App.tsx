import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Test } from './Test';
import { RootState } from '../reducers/rootReducer';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';

export const App: React.FC = () => {
	const selector = (state: RootState) => state.user;
  const loginStatus = useSelector(selector);


	if (!loginStatus) {
		return (
			<>
				<LoginButton />
			</>
		)
	} 
	return (
		<>
			<LogoutButton />
			<Test />
		</>
	);


};

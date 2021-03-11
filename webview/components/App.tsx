import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Test } from './Test';
import { RootState } from '../reducers/rootReducer';
import { LogoutButton } from './LogoutButton';

export const App: React.FC = () => {
	const selector = (state: RootState) => state.user;
  const loginStatus = useSelector(selector);

	const handleLogin = async function() {
		// fires message to the extension to launch "thoughtBubble: show thoughts" command
		await vscodeGlobal.postMessage({
			command: 'login',
			value: null,
		});
	}

	if (!loginStatus) {
		return (
			<div>
				{console.log('rendered')}
				<h1>please log in</h1>
				<button onClick={() => handleLogin()}>login</button>
				<h3>open command pallete with CMD+SHIFT+P and login using the "thoughtBubble: login" command</h3>
			</div>
		)
	} else if (loginStatus) {
		return (
			<>
				<LogoutButton />
				<Test />
			</>
		);
	}

	return (
		<h1>login broken lul</h1>
	);
};

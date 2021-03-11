import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Test } from './Test';
import { RootState } from '../reducers/rootReducer';

export const App: React.FC = () => {
	const selector = (state: RootState) => state.user;
  const loginStatus = useSelector(selector);

	useEffect(() => {
		vscodeGlobal.postMessage({
			command: 'login',
			value: 'login lol'
		});
	}, []);

	if (loginStatus === null) {
		return (
			<div>
				<h1>please log in</h1>
				<h3>open command pallete with CMD+SHIFT+P and login using the "thoughtBubble: login" command</h3>
			</div>
		)
	} else if (loginStatus !== null) {
		return (
			<Test />
		);
	}

	return (
		<h1>login broken lul</h1>
	);
};

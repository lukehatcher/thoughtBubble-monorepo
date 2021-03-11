import * as React from 'react';
import { storeUserAction } from '../actions/storeUserAction';
import { useDispatch } from 'react-redux';

export const LoginButton: React.FC = () => {
	const dispatch = useDispatch();

	window

	const loginUser = async function() {
		// force the rerender
		// dispatch(storeUserAction());

		// fires message to the extension to launch "thoughtBubble: show thoughts" command
		await vscodeGlobal.postMessage({
			command: 'login',
			value: null,
		});
	}

	return (
		<div>
			<button onClick={() => loginUser()}>LOGIN</button>
		</div>
	);
};
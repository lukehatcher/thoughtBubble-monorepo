import * as React from 'react';

export const LogoutButton: React.FC = () => {
	// const selector = (state: RootState) => state.user;
  // const loginStatus = useSelector(selector);

	const logoutUser = async function() {
		await vscodeGlobal.postMessage({
			command: 'logout',
			value: null,
		});
	}

	return (
		<div>
			<button onClick={() => logoutUser()}>logout</button>
		</div>
	);
};
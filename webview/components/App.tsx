import * as React from 'react';
import { useEffect } from 'react';
import { Test } from './Test';
import axios from 'axios';

// let vscodeGlobal; // placeholder

export const App: React.FC = () => {

	vscodeGlobal.postMessage({
		command: 'alert',
		text: '🐛  on line idk'
	});

  // // Handle messages sent from the extension to the webview
  // window.addEventListener('message', event => {
  //     const message = event.data; // The json data that the extension sent
  //     switch (message.command) {
  //         case 'refactor':

  //             break;
  //     }
  // });

	const fetch = async function(): Promise<any> {
		try {
			const response = await axios.get('http://localhost:3001/api/projects/fetch', {
				params: {
					userSub: 'github|52586655',
				}
			});
			return response;
		} catch (err) {
			console.error('@App.tsx: ', err);
		}
	}

	useEffect(() => {
		console.log('hello from useEffect');
		fetch().then((res) => console.log(res));
	}, []);

	

	return (
		<Test />
	);
};

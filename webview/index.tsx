import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import store from './store';

// make send message to main to get the user info

// vscodeglobal.post

vscodeGlobal.postMessage({
	command: 'getUser',
	value: 'null'
});

window.addEventListener('message', (e) => {
	const message = e.data; // The json data that the extension sent
	switch (message.command) {
		case 'sendingData':
			console.log(message.userData, 'wasup'); // TOKEN PASSED IN!!!!
			// store.dispatch({type: 'storeuser', payload: user})
			break;
	}
});

// then listen for the response and add it to the store

// store.dispatch({type: 'storeuser', payload: user})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

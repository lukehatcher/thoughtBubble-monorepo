import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import store from './store';

// request user token from extension
vscodeGlobal.postMessage({
	command: 'getUser',
	value: 'null'
});

// receive the user token from extension
window.addEventListener('message', (e) => {
	const message = e.data; // The json data that the extension sent
	switch (message.command) {
		case 'sendingData':
			console.log(message.userData);
			store.dispatch({type: 'storeuser', payload: message.userData}) // save it in redux store
			break;
	}
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import store from './store';

// make send message to main to get the user info

// vscodeglobal.post

// 	vscodeGlobal.postMessage({
// 		command: 'login',
// 		value: 'null'
// 	});

// then listen for the response and add it to the store

// store.dispatch({type: 'storeuser', payload: user})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

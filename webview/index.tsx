import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import { fetchDataAction } from './actions/fetchDataAction';
// import { storeUserAction } from './actions/storeUserAction';

// request user token from extension
vscodeGlobal.postMessage({
  command: 'getUser',
  value: null,
});

// receive the user token from extension
window.addEventListener('message', (e) => {
  const message = e.data; // The json data that the extension sent
  switch (message.command) {
    case 'sendingData': {
      // should check db here first then await...
      store.dispatch({ type: 'storeUser', payload: JSON.parse(message.userData) });
      const userSub = `github|${JSON.parse(message.userData).id}`; // for now
      store.dispatch(fetchDataAction(userSub));
      return;
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

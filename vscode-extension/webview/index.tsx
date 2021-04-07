import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HomePage } from './components/HomePage';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { fetchDataAction } from './actions/fetchDataAction';
import { Test } from './components/Test';
import { ProjectList } from './components/ProjectList';

// request user token from extension
vscodeGlobal.postMessage({
  command: 'getUser',
  value: null,
});

// receive the user token from extension
window.addEventListener('message', (e) => {
  const message = e.data; // The json data that the extension sent
  switch (message.command) {
    case 'sendingData/refresh': {
      // should check db here first then await...
      store.dispatch({ type: 'storeUser', payload: JSON.parse(message.userData) });
      const userSub = `github|${JSON.parse(message.userData).id}`;
      store.dispatch(fetchDataAction(userSub));
      return;
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/testing" exact component={Test} />
        <Route path="/projectList" exact component={ProjectList} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

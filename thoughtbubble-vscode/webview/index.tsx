import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HomePage } from './components/HomePage';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { fetchDataAction } from './actions/fetchDataAction';
import { SettingsPage } from './components/SettingsPage';
import { ProjectList } from './components/ProjectList';
import { fetchUserInfoAction } from './actions/userInfoActions';

// request user token from extension
vscodeGlobal.postMessage({
  command: 'fetchToken',
  value: null,
});

// receive the user token from extension
window.addEventListener('message', (e) => {
  const message = e.data; // The json data that the extension sent
  switch (message.command) {
    case 'sendingData/refresh': {
      // name should change here later
      store.dispatch({ type: 'token/save', payload: message.token });
      console.log(message.token);
      // seed redux store (after we fetched token)
      store.dispatch(fetchDataAction());
      return;
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/settings" exact component={SettingsPage} />
        <Route path="/projectList" exact component={ProjectList} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

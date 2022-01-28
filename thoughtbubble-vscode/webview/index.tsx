import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { fetchDataAction } from './actions/fetchDataAction';
import { SettingsPage } from './components/SettingsPage';
import { ProjectPage } from './components/ProjectPage';
import { fetchUserInfoAction } from './actions/userInfoActions';
import { routerLocations } from './constants/routerLocations';
import { TokenActionTypes } from './constants/actionTypes';

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
      console.log('HERE IN THE sendingData/refresh', message.token);
      store.dispatch({ type: TokenActionTypes.STORE, payload: message.token });

      // seed redux store (after we fetched token)
      store.dispatch(fetchDataAction());
      store.dispatch(fetchUserInfoAction());
      return;
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path={routerLocations.SETTINGS} component={SettingsPage} />
        <Route path={routerLocations.PROJECTS} component={ProjectPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

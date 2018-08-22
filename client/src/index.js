import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from './redux/create-store';
import App from './components/app';
import TeamProvider from './components/team-provider';
import { values } from './utils';
import styles from './index.css';
import 'normalize.css';
import './favicon.png';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:team?">
        <TeamProvider>{team => <App team={team} />}</TeamProvider>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('App'),
);

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from './redux/create-store';
import App from './components/app';
import { values } from './utils';
import TEAMS from '../../teams';
import styles from './index.css';
import 'normalize.css';
import './favicon.png';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:team?">
        {({ match }) => {
          const team = values(TEAMS).find(p => p.slug === match.params.team);

          return <App team={team ? team.id : undefined} />;
        }}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('App'),
);

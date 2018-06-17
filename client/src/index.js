import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from './redux/create-store';
import App from './components/app';
import { values } from './utils';
import PROJECTS from '../../projects';
import styles from './index.css';
import 'normalize.css';
import './favicon.png';

if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.register('/service-worker.js');
  } catch (e) {
    // You're probably in development mode
  }
}

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:project?">
        {({ match }) => {
          const project = values(PROJECTS).find(
            p => p.slug === match.params.project,
          );

          return <App project={project ? project.id : undefined} />;
        }}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('App'),
);

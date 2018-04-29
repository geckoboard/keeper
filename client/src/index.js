import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from './redux/create-store';
import App from './components/app';
import { PROJECTS } from './constants';
import styles from './index.css';
import 'normalize.css';
import './favicon.png';

const store = createStore();
const projects = Object.keys(PROJECTS).map(key => PROJECTS[key]);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/:project?">
        {({ match }) => {
          let { project } = match.params;

          if (project) {
            project = parseInt(project, 10);
          }

          project = projects.find(p => p.id === project);

          return <App project={project ? project.id : undefined} />;
        }}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('App'),
);

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as icons from '@fortawesome/free-solid-svg-icons';
import createStore from './redux/create-store';
import SocketDispatcher from './components/socket-dispatcher';
import App from './components/app';
import TeamProvider from './components/team-provider';
import { values } from './utils';
import styles from './index.css';
import io from 'socket.io-client';
import 'normalize.css';
import './favicon.png';

const socket =
  process.env.NODE_ENV === 'development' ? io('http://localhost:8000') : io();

const store = createStore();

library.add(
  icons.faCaretDown,
  icons.faCheck,
  icons.faExclamationTriangle,
  icons.faMinusCircle,
  icons.faPencilAlt,
  icons.faTrash,
  icons.faTruck,
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <SocketDispatcher socket={socket} />
      <Router>
        <Route path="/:team?">
          <TeamProvider>{team => <App team={team} />}</TeamProvider>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('App'),
);

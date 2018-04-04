import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createStore from './redux/create-store';
import App from './components/app';
import styles from './index.css';
import 'normalize.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('App'),
);

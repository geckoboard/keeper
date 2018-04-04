import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import * as actions from './redux/actions';
import createStore from './redux/create-store';
import ReactDOM from 'react-dom';
import autobind from 'react-autobind';
import api from './api';
import styles from './index.css';
import 'normalize.css';

const store = createStore();

class App extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    this.props.fetchGoals();
    this.props.fetchStories();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.addGoal();
  }

  handleInput(e) {
    this.setState({ title: e.target.value });
  }

  addGoal() {
    const { title } = this.state;

    if (!title) {
      return;
    }

    this.props.addGoal(title);
    this.setState({ title: '' });
  }

  render() {
    const { goals, deleteGoal } = this.props;
    const { title } = this.state;

    return (
      <div className={styles.container}>
        {goals.loading ? (
          'Loading...'
        ) : (
          <ol>
            {goals.entities.map(goal => (
              <li key={goal.id} onClick={() => deleteGoal(goal.id)}>
                {goal.title}
              </li>
            ))}
          </ol>
        )}
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input type="text" value={title} onChange={this.handleInput} />
          <button type="submit">Add Goal</button>
        </form>
      </div>
    );
  }
}

const ConnectedApp = connect(
  state => state,
  dispatch => ({
    fetchGoals: () => dispatch(actions.fetchGoals()),
    fetchStories: () => dispatch(actions.fetchStories()),
    addGoal: title => dispatch(actions.addGoal(title)),
    deleteGoal: id => dispatch(actions.deleteGoal(id)),
  }),
)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('App'),
);

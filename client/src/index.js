import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import autobind from 'react-autobind';
import api from './api';
import styles from './index.css';
import 'normalize.css';

class App extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      goals: undefined,
      title: '',
    };
  }

  componentDidMount() {
    api.goals.fetch().then(goals => this.setState({ goals }));
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

    api.goals.add(title).then(goal => {
      this.setState(state => ({
        goals: [...state.goals, goal],
        title: '',
      }));
    });
  }

  deleteGoal(id) {
    api.goals.delete(id).then(() => {
      this.setState(state => ({
        goals: state.goals.filter(goal => goal.id !== id),
      }));
    });
  }

  render() {
    const { goals, title } = this.state;

    return (
      <div className={styles.container}>
        {goals ? (
          <ol>
            {goals.map(goal => (
              <li key={goal.id} onClick={() => this.deleteGoal(goal.id)}>
                {goal.title}
              </li>
            ))}
          </ol>
        ) : (
          'Loading...'
        )}
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input type="text" value={title} onChange={this.handleInput} />
          <button type="submit">Add Goal</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

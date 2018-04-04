import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import NavBar from '../navbar';
import StoriesList from '../stories-list';
import styles from './app-styles.css';

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
      <div>
        <NavBar />
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <StoriesList />
          </div>
          <div className={styles.content}>
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
        </div>
      </div>
    );
  }
}

App.propTypes = {
  goals: PropTypes.any,
  stories: PropTypes.any,
  fetchGoals: PropTypes.func,
  fetchStories: PropTypes.func,
  addGoal: PropTypes.func,
  deleteGoal: PropTypes.func,
};

export default App;

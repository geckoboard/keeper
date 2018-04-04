import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import NavBar from '../navbar';
import StoriesList from '../stories-list';
import AddGoalForm from '../add-goal-form';
import Goal from '../goal';
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
            <h2 className={styles.goals_title}>Goals</h2>
            {goals.loading ? (
              'Loading...'
            ) : (
              <div>
                {goals.entities.map(goal => <Goal key={goal.id} goal={goal} />)}
              </div>
            )}
            <AddGoalForm />
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

export default DragDropContext(HTML5Backend)(App);

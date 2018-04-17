import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import NavBar from '../navbar';
import StoriesList from '../stories-list';
import AddGoalForm from '../add-goal-form';
import GoalsList from '../goals-list';
import styles from './app-styles.css';
import Goal from '../goal/goal';

class App extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <StoriesList />
          </div>
          <div className={styles.content}>
            <h2 className={styles.goals_title}>Goals</h2>
            <GoalsList />
            <AddGoalForm />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchGoals: PropTypes.func,
  fetchStories: PropTypes.func,
  onMount: PropTypes.func,
};

export default DragDropContext(HTML5Backend)(App);

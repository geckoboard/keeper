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
import { IconProjectSwitcher } from '../project-switcher';

class App extends Component {
  componentDidMount() {
    const { project, setProject } = this.props;

    if (project) {
      setProject(project);
    }
  }

  componentWillUpdate(nextProps) {
    const { project, setProject } = this.props;

    if (project !== nextProps.project) {
      setProject(nextProps.project);
    }
  }

  render() {
    const { project } = this.props;

    return (
      <div>
        <NavBar project={project} />
        {project ? (
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
        ) : (
          <div className={styles.container}>
            <IconProjectSwitcher />
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  setProject: PropTypes.func,
  project: PropTypes.number,
};

export default DragDropContext(HTML5Backend)(App);

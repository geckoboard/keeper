import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import NavBar from '../navbar';
import StoriesList from '../stories-list';
import ProjectSelector from '../project-selector';
import AddGoalForm from '../add-goal-form';
import GoalsList from '../goals-list';
import styles from './app-styles.css';
import Goal from '../goal/goal';
import { IconTeamSwitcher } from '../team-switcher';

class App extends Component {
  componentDidMount() {
    const { team, setTeam, init } = this.props;

    init();

    if (team) {
      setTeam(team);
    }
  }

  componentWillUpdate(nextProps) {
    const { team, setTeam } = this.props;

    if (team !== nextProps.team) {
      setTeam(nextProps.team);
    }
  }

  render() {
    const { team } = this.props;

    return (
      <div>
        <NavBar team={team} />
        {team ? (
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <ProjectSelector />
              <StoriesList />
            </div>
            <div className={styles.content}>
              <h2 className={styles.goals_title}>Goals</h2>
              <GoalsList />
              <div className={styles.add_goal_form}>
                <AddGoalForm />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <IconTeamSwitcher />
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  setTeam: PropTypes.func,
  team: PropTypes.number,
};

export default DragDropContext(HTML5Backend)(App);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Sidebar from '../sidebar';
import AddGoalForm from '../add-goal-form';
import GoalsList from '../goals-list';
import styles from './app-styles.css';
import { IconTeamSwitcher, DropdownTeamSwitcher } from '../team-switcher';

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
        {team ? (
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <Sidebar />
            </div>
            <div className={styles.content}>
              {!!team && <DropdownTeamSwitcher />}
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
  init: PropTypes.func,
  setTeam: PropTypes.func,
  team: PropTypes.number,
};

export default DragDropContext(HTML5Backend)(App);

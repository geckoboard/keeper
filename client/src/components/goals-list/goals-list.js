import React from 'react';
import PropTypes from 'prop-types';
import Goal from '../goal';
import SkeletonGoal from '../skeleton-goal';
import styles from './goals-list-styles.css';

const GoalsList = ({ goals, loading }) => {
  if (loading) {
    return (
      <div className={styles.skeleton_container}>
        <SkeletonGoal />
        <SkeletonGoal />
        <SkeletonGoal />
        <SkeletonGoal />
      </div>
    );
  }

  return <div>{goals.map(goal => <Goal key={goal.id} goal={goal} />)}</div>;
};

GoalsList.propTypes = {
  goals: PropTypes.array,
  loading: PropTypes.bool,
};

export default GoalsList;

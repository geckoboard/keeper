import React from 'react';
import styles from './skeleton-goal-styles.css';

const SkeletonGoal = props => (
  <div className={styles.container}>
    <div className={styles.title} />
    <div className={styles.stories_container}>
      <div className={styles.story} />
      <div className={styles.story} />
    </div>
    <div className={styles.shine} />
  </div>
);

export default SkeletonGoal;

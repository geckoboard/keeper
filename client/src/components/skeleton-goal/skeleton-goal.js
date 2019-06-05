import React from 'react';
import Shimmer from '../shimmer';
import styles from './skeleton-goal-styles.css';

const SkeletonGoal = () => (
  <Shimmer>
    <div className={styles.container}>
      <div className={styles.title} />
      <div className={styles.stories_container}>
        <div className={styles.story} />
        <div className={styles.story} />
      </div>
    </div>
  </Shimmer>
);

export default SkeletonGoal;

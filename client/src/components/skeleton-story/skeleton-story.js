import React from 'react';
import Shimmer from '../shimmer';
import styles from './skeleton-story-styles.css';

const SkeletonStory = () => {
  return (
    <div className={styles.container}>
      <Shimmer>
        <div>
          <div className={styles.title} />
          <div className={styles.title} />
          <div className={styles.title} />
        </div>
        <div className={styles.id_container}>
          <div className={styles.id} />
        </div>
      </Shimmer>
    </div>
  );
};

export default SkeletonStory;

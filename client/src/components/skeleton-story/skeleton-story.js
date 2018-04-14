import React from 'react';
import styles from './skeleton-story-styles.css';

const SkeletonStory = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title} />
        <div className={styles.title} />
        <div className={styles.title} />
      </div>
      <div className={styles.id_container}>
        <div className={styles.id} />
      </div>
      <div className={styles.shine} />
    </div>
  );
};

export default SkeletonStory;

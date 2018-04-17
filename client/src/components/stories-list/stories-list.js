import React from 'react';
import PropTypes from 'prop-types';
import Story from '../story';
import SkeletonStory from '../skeleton-story';
import styles from './stories-list-styles.css';

const StoriesList = ({ loading, stories }) => {
  return (
    <div>
      {stories.map(story => <Story key={story.id} {...story} />)}
      {loading && (
        <div className={styles.skeleton_container}>
          <SkeletonStory />
          <SkeletonStory />
          <SkeletonStory />
          <SkeletonStory />
          <SkeletonStory />
        </div>
      )}
    </div>
  );
};

StoriesList.propTypes = {
  loading: PropTypes.bool,
  stories: PropTypes.array,
};

export default StoriesList;

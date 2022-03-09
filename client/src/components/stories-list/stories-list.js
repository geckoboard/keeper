import React from 'react';
import PropTypes from 'prop-types';
import Story from '../story';
import SkeletonStory from '../skeleton-story';
import { times } from '../../utils';
import styles from './stories-list-styles.css';

const StoriesList = ({ loading, stories, projectColours }) => {
  if (!loading && stories.length === 0) {
    return (
      <div className={styles.empty_container}>
        <div className={styles.empty}>
          <span className={styles.emptyTada}>🎉</span>
          <span className={styles.emptyMessage}>You’re all done</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {stories.map(story => (
        <Story
          key={story.id}
          {...story}
          colour={projectColours[story.project_id]}
        />
      ))}
      {loading && (
        <div className={styles.skeleton_container}>
          {times(5 - stories.length).map((_, i) => (
            <SkeletonStory key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

StoriesList.propTypes = {
  loading: PropTypes.bool,
  stories: PropTypes.array,
  projectColours: PropTypes.object,
};

export default StoriesList;

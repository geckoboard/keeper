import React from 'react';
import PropTypes from 'prop-types';
import styles from './linked-story-styles.css';

const getIcon = story => {
  if (story.completed) {
    return (
      <i
        className={`fas fa-check ${styles.icon} ${styles.story_icon_completed}`}
      />
    );
  }

  if (story.started) {
    return <i className={`fas fa-truck ${styles.icon}`} />;
  }

  if (story.blocker) {
    return <i className={`fas fa-exclamation-triangle ${styles.icon}`} />;
  }

  if (story.blocked) {
    return <i className={`fas fa-minus-circle ${styles.icon}`} />;
  }

  return null;
};

const LinkedStory = ({ story, index, onDelete }) => {
  return (
    <div className={styles.story}>
      <button className={styles.icon_button} onClick={onDelete}>
        {getIcon(story)}
        <i className={`fas fa-trash ${styles.delete}`} />
      </button>
      {index}. {story.name}
      <a className={styles.id} href={story.app_url} target="_blank">
        (#{story.id})
      </a>
    </div>
  );
};

LinkedStory.propTypes = {
  story: PropTypes.shape({
    name: PropTypes.string,
  }),
  index: PropTypes.number,
  onDelete: PropTypes.func,
};

export default LinkedStory;

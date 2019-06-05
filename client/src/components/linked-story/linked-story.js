import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from './linked-story-styles.css';

const getIcon = story => {
  if (story.completed) {
    return icons.faCheck;
  }

  if (story.started) {
    return icons.faTruck;
  }

  if (story.blocker) {
    return icons.faExclamationTriangle;
  }

  if (story.blocked) {
    return icons.faMinusCircle;
  }

  return;
};

const getClassName = story =>
  story.completed
    ? `${styles.icon} ${styles.story_icon_completed}`
    : styles.icon;

const LinkedStory = ({ story, index, onDelete }) => {
  return (
    <div className={styles.story}>
      <button className={styles.icon_button} onClick={onDelete}>
        <FontAwesomeIcon
          icon={getIcon(story)}
          className={getClassName(story)}
        />
        <FontAwesomeIcon icon={icons.faTrash} className={styles.delete} />
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

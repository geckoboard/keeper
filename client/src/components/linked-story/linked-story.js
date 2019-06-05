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
      <FontAwesomeIcon icon={getIcon(story)} className={getClassName(story)} />
      <div className={styles.content}>
        <div className={styles.number}>{index}.</div>
        <div className={styles.name}>
          {story.name}
          <span className={styles.after}>
            <a
              className={styles.id}
              href={story.app_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              (#{story.id})
            </a>
            <button className={styles.delete_button} onClick={onDelete}>
              <FontAwesomeIcon icon={icons.faTrash} />
            </button>
          </span>
        </div>
      </div>
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

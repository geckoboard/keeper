import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import LabelList from '../label-list';
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

const getInitials = name => {
  return name
    .split(' ')
    .map(n => n.slice(0, 1).toUpperCase())
    .join('');
};

const renderOwners = ownerNames => {
  return ownerNames.map((name, index) => {
    return (
      <span className={styles.owner} key={index}>
        <span className={styles.initials}>{getInitials(name)}</span>
      </span>
    );
  });
};

const LinkedStory = props => {
  const {
    story,
    index,
    ownerNames,
    showStoryLabels,
    showStoryOwners,
    connectDragSource,
    onDelete,
  } = props;
  const doRenderOwners =
    showStoryOwners && !story.completed && !!ownerNames.length;

  return (
    <div className={styles.story}>
      <span className={getClassName(story)}>
        <FontAwesomeIcon icon={getIcon(story)} />
      </span>
      <div className={styles.content}>
        <div className={styles.number}>{index}.</div>
        <div className={styles.name}>
          {connectDragSource(
            <span className={styles.dragHandle}>{story.name}</span>,
          )}
          {showStoryLabels && <LabelList labels={story.labels} />}
          {doRenderOwners && (
            <span className={styles.ownerList}>{renderOwners(ownerNames)}</span>
          )}
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
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
  goalId: PropTypes.number,
  id: PropTypes.number,
  index: PropTypes.number,
  ownerNames: PropTypes.arrayOf(PropTypes.string),
  showStoryLabels: PropTypes.bool,
  showStoryOwners: PropTypes.bool,
  connectDragSource: PropTypes.func,
  onDelete: PropTypes.func,
};

export default LinkedStory;

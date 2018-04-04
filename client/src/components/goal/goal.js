import React from 'react';
import PropTypes from 'prop-types';
import styles from './goal-styles.css';

const getStoryIcon = story => {
  if (story.completed) {
    return (
      <i
        className={`fas fa-check ${styles.story_icon} ${
          styles.story_icon_completed
        }`}
      />
    );
  }

  if (story.started) {
    return <i className={`fas fa-truck ${styles.story_icon}`} />;
  }

  if (story.blocker) {
    return <i className={`fas fa-exclamation-triangle ${styles.story_icon}`} />;
  }

  if (story.blocked) {
    return <i className={`fas fa-minus-circle ${styles.story_icon}`} />;
  }

  if (story.blocked) {
  }

  return <i className={styles.story_icon} />;
};

const Goal = ({ goal, onDelete, stories }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titlebar}>
        <span className={styles.title}>{goal.title}</span>
        <div className={styles.actions}>
          <button onClick={onDelete} className={styles.delete_button}>
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
      <div className={styles.stories_list}>
        {stories.map((story, index) => (
          <div key={story.id} className={styles.story}>
            {getStoryIcon(story)}
            {index + 1}. {story.name}
          </div>
        ))}
      </div>
    </div>
  );
};

Goal.defaultProps = {
  stories: [],
};

Goal.propTypes = {
  goal: PropTypes.shape({
    title: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

export default Goal;

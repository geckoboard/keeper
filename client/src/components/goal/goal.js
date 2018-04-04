import React from 'react';
import PropTypes from 'prop-types';
import styles from './goal-styles.css';

const stories = [
  {
    entity_type: 'story',
    id: 21179,
    name: 'Add ' + ' button to all empty slots',
    story_type: 'feature',
    started: false,
    completed: false,
    blocker: false,
    blocked: true,
    app_url: 'https://app.clubhouse.io/geckoboard/story/21179',
  },
  {
    entity_type: 'story',
    id: 21180,
    name: 'Hide + button and modal in fullscreen mode',
    story_type: 'feature',
    started: true,
    completed: false,
    blocker: false,
    blocked: false,
    app_url: 'https://app.clubhouse.io/geckoboard/story/21179',
  },
  {
    entity_type: 'story',
    id: 21181,
    name:
      "SPIKE: Frontend + Backend pairing to find how to support widgets that aren't on the dashboard (1 day)",
    story_type: 'feature',
    started: true,
    completed: true,
    blocker: false,
    blocked: false,
    app_url: 'https://app.clubhouse.io/geckoboard/story/21179',
  },
];

const Goal = ({ goal, onDelete }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titlebar}>
        <span className={styles.title}>{goal.title}</span>
        <div className={styles.actions}>
          <button onClick={onDelete} className={styles.delete_button}>
            <i class="fas fa-trash" />
          </button>
        </div>
      </div>
      <div className={styles.stories_list}>
        {stories.map((story, index) => (
          <div key={story.id} className={styles.story}>
            {index + 1}. {story.name}
          </div>
        ))}
      </div>
    </div>
  );
};

Goal.propTypes = {
  goal: PropTypes.shape({
    title: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

export default Goal;

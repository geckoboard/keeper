import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoalTitleInput from '../goal-title-input';
import autobind from 'react-autobind';
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

  return <i className={styles.story_icon} />;
};

class Goal extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      edit: false,
    };
  }

  handleTitleChange(title) {
    this.props.onUpdate(title);
    this.setState({ edit: false });
  }

  render() {
    const { goal, onDelete, onUpdate, stories } = this.props;

    if (this.state.edit) {
      return (
        <div className={styles.container}>
          <GoalTitleInput
            initialValue={goal.title}
            onCancel={() => this.setState({ edit: false })}
            onSubmit={this.handleTitleChange}
          />
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.titlebar}>
          <span className={styles.title}>{goal.title}</span>
          <div className={styles.actions}>
            <button
              onClick={() => this.setState({ edit: true })}
              className={styles.edit_button}
            >
              <i className="fas fa-pencil-alt" />
            </button>
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
  }
}

Goal.defaultProps = {
  stories: [],
};

Goal.propTypes = {
  goal: PropTypes.shape({
    title: PropTypes.string,
  }),
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default Goal;

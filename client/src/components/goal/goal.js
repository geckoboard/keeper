import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import GoalTitleInput from '../goal-title-input';
import LinkedStory from '../linked-story';
import CreateStoryDropdown from '../create-story-dropdown';
import Shimmer from '../shimmer';
import autobind from 'react-autobind';
import styles from './goal-styles.css';

class Goal extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      edit: false,
    };
  }

  handleTitleChange(title) {
    this.props.onChangeTitle(title);
    this.setState({ edit: false });
  }

  handleSweep() {
    const { goal, stories, onDeleteStories } = this.props;
    const toClean = goal.cards.filter(id => {
      const story = stories.find(s => s.id === id);

      return !story || story.completed || story.archived;
    });

    onDeleteStories(toClean);
  }

  render() {
    const {
      goal,
      onDelete,
      onDeleteStories,
      showStoryLabels,
      showStoryOwners,
      stories,
      loadingStories,
      createDragHandle,
    } = this.props;

    const cards = goal.cards.filter(id => stories.find(s => s.id === id));
    const unfound = goal.cards.filter(id => !stories.find(s => s.id === id));

    return (
      <div className={styles.container}>
        <div className={styles.titlebar}>
          {this.state.edit ? (
            <GoalTitleInput
              initialValue={goal.title}
              onCancel={() => this.setState({ edit: false })}
              onSubmit={this.handleTitleChange}
            />
          ) : (
            createDragHandle(<span className={styles.title}>{goal.title}</span>)
          )}
          {!this.state.edit && (
            <div className={styles.actions}>
              <button
                onClick={() => this.setState({ edit: true })}
                className={styles.edit_button}
              >
                <FontAwesomeIcon icon={icons.faPencilAlt} />
              </button>
              <button
                onClick={() => this.handleSweep()}
                className={styles.edit_button}
              >
                <FontAwesomeIcon icon={icons.faBroom} />
              </button>
              <button onClick={onDelete} className={styles.check_button}>
                <FontAwesomeIcon icon={icons.faCheck} />
              </button>
            </div>
          )}
        </div>
        <div className={styles.stories_list}>
          {cards.length === 0 && <CreateStoryDropdown goal={goal} />}
          {cards.map((card, index) => {
            const story = stories.find(s => s.id === card);

            if (story) {
              return (
                <LinkedStory
                  key={story.id}
                  id={story.id}
                  story={story}
                  index={index + 1}
                  goalId={goal.id}
                  showStoryOwners={showStoryOwners}
                  showStoryLabels={showStoryLabels}
                />
              );
            }

            if (loadingStories) {
              return (
                <div key={card} className={styles.skeleton_story_container}>
                  <Shimmer>
                    <div className={styles.skeleton_story} />
                  </Shimmer>
                </div>
              );
            }
          })}
          {!loadingStories && unfound.length > 0 && (
            <span className={styles.archived_count}>
              Not found:{' '}
              {unfound.map((id, index) => (
                <span key={id}>
                  <a
                    className={styles.archived_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://app.clubhouse.io/geckoboard/story/${id}`}
                  >
                    (#{id})
                  </a>
                  {index < unfound.length - 1 && ', '}
                </span>
              ))}
              <button
                className={styles.delete_unfound_button}
                onClick={() => onDeleteStories(unfound)}
              >
                <FontAwesomeIcon icon={icons.faTrash} />
              </button>
            </span>
          )}
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
  onDeleteStories: PropTypes.func,
  onChangeTitle: PropTypes.func,
  loadingStories: PropTypes.bool,
  showStoryLabels: PropTypes.bool,
  showStoryOwners: PropTypes.bool,
  stories: PropTypes.array,
  createDragHandle: PropTypes.func,
};

export default Goal;

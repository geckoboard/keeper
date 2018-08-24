import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoalTitleInput from '../goal-title-input';
import LinkedStory from '../linked-story';
import Shimmer from '../shimmer';
import autobind from 'react-autobind';
import styles from './goal-styles.css';

const emptyMessages = [
  `🤷‍ Have you seen a Clubhouse card anywhere?`,
  `🥑 There’s a goal, but it doesn’t av-a-card-do`,
  `👻 This goal... is coming like a ghost town!`,
  `🐝 There must bee a card for this goal somewhere`,
  `🦁 Have you seen a card lion around here?`,
  `🌲 I can’t be-leaf this goal has no cards`,
  `⚾ Throw me a Clubhouse card!`,
  `🕸 It sure is quiet in here`,
];

const getRandomEmptyMessage = () => {
  return emptyMessages[Math.floor(Math.random() * emptyMessages.length)];
};

class Goal extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.emptyMessage = getRandomEmptyMessage();

    this.state = {
      edit: false,
    };
  }

  handleTitleChange(title) {
    this.props.onChangeTitle(title);
    this.setState({ edit: false });
  }

  render() {
    const {
      goal,
      onDelete,
      onChangeTitle,
      stories,
      loadingStories,
      createDragHandle,
    } = this.props;

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

    const cards = goal.cards;
    const unfound = cards.filter(id => !stories.find(s => s.id === id));
    const isEmpty = cards.length === 0;

    return (
      <div className={styles.container}>
        <div className={styles.titlebar}>
          {createDragHandle(<span className={styles.title}>{goal.title}</span>)}
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
          {isEmpty && <span className={styles.empty}>{this.emptyMessage}</span>}
          {cards.map((card, index) => {
            const story = stories.find(s => s.id === card);

            if (story) {
              return (
                <LinkedStory
                  key={card}
                  story={story}
                  index={index + 1}
                  goalId={goal.id}
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
          {!loadingStories &&
            unfound.length > 0 && (
              <span className={styles.archived_count}>
                {unfound.map((id, index) => (
                  <span key={id}>
                    <a
                      className={styles.archived_link}
                      target="_blank"
                      href={`https://app.clubhouse.io/geckoboard/story/${id}`}
                    >
                      #{id}
                    </a>
                    {index < unfound.length - 1 && ', '}
                  </span>
                ))}
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
  onChangeTitle: PropTypes.func,
  loadingStories: PropTypes.bool,
  stories: PropTypes.array,
  createDragHandle: PropTypes.func,
};

export default Goal;

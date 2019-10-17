import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Goal from '../goal';
import KeyListener from '../key-listener';

const isShowOwnersEnabled = () => {
  return localStorage.getItem('show_story_owners') === 'true';
};

const storeShowOwnersState = showOwners => {
  localStorage.setItem('show_story_owners', showOwners ? 'true' : 'false');
};

const isShowLabelsEnabled = () => {
  return localStorage.getItem('show_story_labels') === 'true';
};

const storeShowLabelsState = showLabels => {
  localStorage.setItem('show_story_labels', showLabels ? 'true' : 'false');
};

class GoalsList extends Component {
  constructor() {
    super();

    this.state = {
      showStoryOwners: isShowOwnersEnabled(),
      showStoryLabels: isShowLabelsEnabled(),
    };

    this.toggleShowStoryOwners = this.toggleShowStoryOwners.bind(this);
    this.toggleShowStoryLabels = this.toggleShowStoryLabels.bind(this);
  }

  toggleShowStoryOwners() {
    const show = !this.state.showStoryOwners;
    this.setState({ showStoryOwners: show });
    storeShowOwnersState(show);
  }

  toggleShowStoryLabels() {
    const show = !this.state.showStoryLabels;
    this.setState({ showStoryLabels: show });
    storeShowLabelsState(show);
  }

  render() {
    const { goals } = this.props;
    const { showStoryOwners, showStoryLabels } = this.state;
    return (
      <div>
        <KeyListener character="o" onKeyPress={this.toggleShowStoryOwners} />
        <KeyListener character="l" onKeyPress={this.toggleShowStoryLabels} />
        {goals.map(goal => (
          <Goal
            key={goal.id}
            goal={goal}
            showStoryOwners={showStoryOwners}
            showStoryLabels={showStoryLabels}
          />
        ))}
      </div>
    );
  }
}

GoalsList.propTypes = {
  goals: PropTypes.array,
};

export default GoalsList;

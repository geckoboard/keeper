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

class GoalsList extends Component {
  constructor() {
    super();

    this.state = {
      showStoryOwners: isShowOwnersEnabled(),
    };

    this.toggleShowStoryOwners = this.toggleShowStoryOwners.bind(this);
  }

  toggleShowStoryOwners() {
    const show = !this.state.showStoryOwners;
    this.setState({ showStoryOwners: show });
    storeShowOwnersState(show);
  }

  render() {
    const { goals } = this.props;
    const { showStoryOwners } = this.state;
    return (
      <div>
        <KeyListener character="o" onKeyPress={this.toggleShowStoryOwners} />
        {goals.map(goal => (
          <Goal key={goal.id} goal={goal} showStoryOwners={showStoryOwners} />
        ))}
      </div>
    );
  }
}

GoalsList.propTypes = {
  goals: PropTypes.array,
};

export default GoalsList;

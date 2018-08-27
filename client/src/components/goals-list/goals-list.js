import React from 'react';
import PropTypes from 'prop-types';
import Goal from '../goal';

const GoalsList = ({ goals }) => (
  <div>{goals.map(goal => <Goal key={goal.id} goal={goal} />)}</div>
);

GoalsList.propTypes = {
  goals: PropTypes.array,
};

export default GoalsList;

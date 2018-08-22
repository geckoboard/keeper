import React from 'react';
import PropTypes from 'prop-types';

const TeamProvider = ({ children, team }) => children(team);

TeamProvider.propTypes = {
  children: PropTypes.func,
  team: PropTypes.number,
};

export default TeamProvider;

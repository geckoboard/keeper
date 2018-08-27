import React from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown-team-switcher-styles.css';

const DropdownTeamSwitcher = ({ onChange, teams, value }) => (
  <select
    className={styles.input}
    value={value}
    onChange={e => onChange(parseInt(e.target.value), 10)}
  >
    <option disabled value={-1}>
      Select team
    </option>
    {teams.map(team => (
      <option key={team.id} value={team.id}>
        {team.icon} {team.title}
      </option>
    ))}
  </select>
);

DropdownTeamSwitcher.defaultProps = {
  value: -1,
};

DropdownTeamSwitcher.propTypes = {
  onChange: PropTypes.func,
  teams: PropTypes.array,
  value: PropTypes.number,
};

export default DropdownTeamSwitcher;

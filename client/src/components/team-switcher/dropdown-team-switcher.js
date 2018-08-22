import React from 'react';
import PropTypes from 'prop-types';
import TEAMS from '../../../../teams';
import { values } from '../../utils';
import styles from './dropdown-team-switcher-styles.css';

const DropdownTeamSwitcher = ({ value, onChange }) => (
  <select
    className={styles.input}
    value={value}
    onChange={e => onChange(parseInt(e.target.value), 10)}
  >
    <option disabled value={-1}>
      Select team
    </option>
    {values(TEAMS).map(team => (
      <option key={team.id} value={team.id}>
        {team.icon} {team.name}
      </option>
    ))}
  </select>
);

DropdownTeamSwitcher.defaultProps = {
  value: -1,
};

DropdownTeamSwitcher.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default DropdownTeamSwitcher;

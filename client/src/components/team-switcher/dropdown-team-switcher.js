import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from './dropdown-team-switcher-styles.css';
import KeyListener from '../key-listener';

const DropdownTeamSwitcher = ({ onChange, teams, value }) => (
  <div className={styles.DropdownTeamSwitcher}>
    <KeyListener character="t" onKeyPress={() => onChange()} />
    <div className={styles.container}>
      <h2 className={styles.title}>
        Team {teams.find(t => t.id === value).title}
        <span className={styles.caret}>
          <FontAwesomeIcon icon={icons.faCaretDown} />
        </span>
      </h2>
      <select
        tabIndex={1}
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
    </div>
  </div>
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

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TEAMS from '../../../../teams';
import { values } from '../../utils';
import styles from './icon-team-switcher-styles.css';

const IconTeamSwitcher = ({ onChange }) => {
  return (
    <div className={styles.container}>
      {values(TEAMS).map(team => (
        <Link to={`/${team.slug}`} key={team.id} className={styles.team}>
          <span className={styles.team_contents}>
            <span className={styles.team_icon}>{team.icon}</span>
            <span className={styles.team_name}>{team.name}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

IconTeamSwitcher.propTypes = {
  onChange: PropTypes.func,
};

export default IconTeamSwitcher;

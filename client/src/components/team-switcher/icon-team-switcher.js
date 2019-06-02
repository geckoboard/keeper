import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './icon-team-switcher-styles.css';

const IconTeamSwitcher = ({ teams }) => {
  return (
    <div className={styles.container}>
      {teams.map(team => (
        <Link to={`/${team.slug}`} key={team.id} className={styles.team}>
          <span className={styles.team_contents}>
            <span className={styles.team_icon}>{team.icon}</span>
            <span className={styles.team_name}>{team.title}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

IconTeamSwitcher.propTypes = {
  teams: PropTypes.array,
};

export default IconTeamSwitcher;

import React from 'react';
import PropTypes from 'prop-types';
import { DropdownTeamSwitcher } from '../team-switcher';
import styles from './navbar-styles.css';
import logo from '../../images/logo.png';
import logo2X from '../../images/logo@2x.png';

const NavBar = ({ team }) => (
  <header className={styles.container}>
    <img srcSet={`${logo}, ${logo2X} 2x`} src={logo} className={styles.logo} />
    <div className={styles.team_switcher}>
      {!!team && <DropdownTeamSwitcher value={team} />}
    </div>
  </header>
);

NavBar.propTypes = {
  team: PropTypes.number,
};

export default NavBar;

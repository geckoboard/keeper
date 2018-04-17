import React from 'react';
import PropTypes from 'prop-types';
import { DropdownProjectSwitcher } from '../project-switcher';
import styles from './navbar-styles.css';
import logo from '../../images/logo.png';
import logo2X from '../../images/logo@2x.png';

const NavBar = ({ showProjectSwitcher }) => (
  <header className={styles.container}>
    <img srcSet={`${logo}, ${logo2X} 2x`} src={logo} className={styles.logo} />
    <div className={styles.project_switcher}>
      {showProjectSwitcher && <DropdownProjectSwitcher />}
    </div>
  </header>
);

NavBar.propTypes = {
  showProjectSwitcher: PropTypes.bool,
};

export default NavBar;

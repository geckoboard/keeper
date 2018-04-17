import React from 'react';
import ProjectSwitcher from '../project-switcher';
import styles from './navbar-styles.css';
import logo from '../../images/logo.png';
import logo2X from '../../images/logo@2x.png';

const NavBar = () => (
  <header className={styles.container}>
    <img srcSet={`${logo}, ${logo2X} 2x`} src={logo} className={styles.logo} />
    <div className={styles.project_switcher}>
      <ProjectSwitcher />
    </div>
  </header>
);

export default NavBar;

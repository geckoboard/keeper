import React from 'react';
import styles from './navbar-styles.css';
import logo from '../../images/logo.png';
import logo2X from '../../images/logo@2x.png';

const NavBar = () => (
  <header className={styles.container}>
    <img srcSet={`${logo}, ${logo2X} 2x`} src={logo} className={styles.logo} />
  </header>
);

export default NavBar;

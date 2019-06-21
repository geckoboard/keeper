import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import StoriesList from '../stories-list';
import ProjectSelector from '../project-selector';
import styles from './sidebar.css';
import KeyListener from '../key-listener';

const isOpen = () => {
  return localStorage.getItem('sidebar_open') !== 'CLOSED';
};

const storeOpenState = isOpen => {
  localStorage.setItem('sidebar_open', isOpen ? 'OPEN' : 'CLOSED');
};

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = { open: isOpen(), scrolled: false };
    this.toggle = this.toggle.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(e) {
    const { scrolled } = this.state;

    if (e.target.scrollTop > 0 && !scrolled) {
      this.setState({ scrolled: true });
    } else if (e.target.scrollTop === 0 && scrolled) {
      this.setState({ scrolled: false });
    }
  }

  toggle() {
    const open = !this.state.open;
    this.setState({ open });
    storeOpenState(open);
  }

  render() {
    const { open, scrolled } = this.state;

    return (
      <div
        className={`${styles.sidebar} ${open ? styles.open : styles.closed} ${
          scrolled ? styles.scrolled : styles.notScrolled
        }`}
      >
        <KeyListener character="s" onKeyPress={this.toggle} />
        <div className={styles.sidebar__content}>
          <div className={styles.sidebar__header}>
            <ProjectSelector />
            <button
              className={styles.sidebar__toggle}
              onClick={() => this.toggle()}
            >
              <span className={styles.sidebar__toggle__icon}>
                <FontAwesomeIcon icon={icons.faChevronLeft} />
              </span>
            </button>
          </div>
          <div className={styles.sidebar__stories} onScroll={this.handleScroll}>
            <StoriesList />
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

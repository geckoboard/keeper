import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { times } from '../../utils';
import Shimmer from '../shimmer';
import styles from '../project-selector/project-selector-styles.css';

class ShortcutTeamSelector extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleGlobalClick = this.handleGlobalClick.bind(this);
    this.handleGlobalKeydown = this.handleGlobalKeydown.bind(this);

    this.state = {
      open: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open === this.state.open) {
      return;
    }

    if (this.state.open) {
      document.addEventListener('click', this.handleGlobalClick, true);
      document.addEventListener('keydown', this.handleGlobalKeydown, true);
    } else {
      document.removeEventListener('click', this.handleGlobalClick, true);
      document.removeEventListener('keydown', this.handleGlobalKeydown, true);
    }
  }

  handleToggle() {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
      this.props.onOpen();
    }
  }

  handleGlobalClick(e) {
    if (!this.list.contains(e.target)) {
      e.stopPropagation();
      this.setState({ open: false });
    }
  }

  handleGlobalKeydown(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      e.stopPropagation();
      this.setState({ open: false });
    }
  }

  handleShortcutTeamselect(shortcutTeam) {
    const { onChange, selected } = this.props;
    onChange(shortcutTeam, !selected.includes(shortcutTeam));
  }

  render() {
    const { loading, shortcutTeams, selected } = this.props;

    return (
      <div className={styles.container}>
        <button className={styles.label} onClick={this.handleToggle}>
          {selected.length === 1
            ? `${selected.length} team`
            : `${selected.length} teams`}
          <FontAwesomeIcon
            icon={icons.faCaretDown}
            className={styles.buttonCaret}
          />
        </button>
        {this.state.open && (
          <div ref={node => (this.list = node)} className={styles.list}>
            {loading
              ? times(16).map((_, i) => (
                  <div key={i} className={styles.ghostProject}>
                    <input type="checkbox" checked={false} />
                    <div className={styles.ghostProjectNameContainer}>
                      <Shimmer>
                        <div className={styles.ghostProjectName} />
                      </Shimmer>
                    </div>
                  </div>
                ))
              : shortcutTeams.map(shortcutTeam => (
                  <div key={shortcutTeam.id} className={styles.project}>
                    <input
                      type="checkbox"
                      checked={selected.includes(shortcutTeam.id)}
                      onChange={() =>
                        this.handleShortcutTeamselect(shortcutTeam.id)
                      }
                    />
                    <span className={styles.projectName}>
                      {shortcutTeam.name}
                    </span>
                  </div>
                ))}
          </div>
        )}
      </div>
    );
  }
}

ShortcutTeamSelector.defaultProps = {
  shortcutTeams: [],
  selected: [],
};

ShortcutTeamSelector.propTypes = {
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  shortcutTeams: PropTypes.array,
  selected: PropTypes.array,
};

export default ShortcutTeamSelector;

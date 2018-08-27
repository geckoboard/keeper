import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { times } from '../../utils';
import Shimmer from '../shimmer';
import styles from './project-selector-styles.css';

class ProjectSelector extends Component {
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

  handleProjectSelect(project) {
    const { onChange, selected } = this.props;
    onChange(project, !selected.includes(project));
  }

  render() {
    const { loading, onChange, onOpen, projects, selected } = this.props;

    return (
      <div className={styles.container}>
        <button className={styles.label} onClick={this.handleToggle}>
          {selected.length === 1
            ? `${selected.length} project`
            : `${selected.length} projects`}
          <i className={`fas fa-caret-down ${styles.buttonCaret}`} />
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
              : projects.map(project => (
                  <div key={project.id} className={styles.project}>
                    <input
                      type="checkbox"
                      checked={selected.includes(project.id)}
                      onChange={() => this.handleProjectSelect(project.id)}
                    />
                    <span className={styles.projectName}>{project.name}</span>
                  </div>
                ))}
          </div>
        )}
      </div>
    );
  }
}

ProjectSelector.defaultProps = {
  projects: [],
  selected: [],
};

ProjectSelector.propTypes = {
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  projects: PropTypes.array,
  selected: PropTypes.array,
};

export default ProjectSelector;

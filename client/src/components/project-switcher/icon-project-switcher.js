import React from 'react';
import PropTypes from 'prop-types';
import { PROJECTS } from '../../constants';
import styles from './icon-project-switcher-styles.css';

const IconProjectSwitcher = ({ onChange }) => {
  return (
    <div className={styles.container}>
      {Object.keys(PROJECTS).map(key => {
        const project = PROJECTS[key];
        return (
          <button
            key={project.id}
            className={styles.project_button}
            onClick={() => onChange(project.id)}
          >
            <span className={styles.project_button_icon}>{project.icon}</span>
            <span className={styles.project_button_name}>{project.name}</span>
          </button>
        );
      })}
    </div>
  );
};

IconProjectSwitcher.propTypes = {
  onChange: PropTypes.func,
};

export default IconProjectSwitcher;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../constants';
import styles from './icon-project-switcher-styles.css';

const IconProjectSwitcher = ({ onChange }) => {
  return (
    <div className={styles.container}>
      {Object.keys(PROJECTS).map(key => {
        const project = PROJECTS[key];
        return (
          <Link
            to={`/${project.id}`}
            key={project.id}
            className={styles.project}
          >
            <span className={styles.project_contents}>
              <span className={styles.project_icon}>{project.icon}</span>
              <span className={styles.project_name}>{project.name}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
};

IconProjectSwitcher.propTypes = {
  onChange: PropTypes.func,
};

export default IconProjectSwitcher;

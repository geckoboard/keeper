import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PROJECTS from '../../../../projects';
import { values } from '../../utils';
import styles from './icon-project-switcher-styles.css';

const IconProjectSwitcher = ({ onChange }) => {
  return (
    <div className={styles.container}>
      {values(PROJECTS).map(project => (
        <Link
          to={`/${project.slug}`}
          key={project.id}
          className={styles.project}
        >
          <span className={styles.project_contents}>
            <span className={styles.project_icon}>{project.icon}</span>
            <span className={styles.project_name}>{project.name}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

IconProjectSwitcher.propTypes = {
  onChange: PropTypes.func,
};

export default IconProjectSwitcher;

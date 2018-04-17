import React from 'react';
import PropTypes from 'prop-types';
import { PROJECTS } from '../../constants';
import styles from './project-switcher-styles.css';

const ProjectSwitcher = ({ value, onChange }) => (
  <select
    className={styles.input}
    value={value}
    onChange={e => onChange(parseInt(e.target.value), 10)}
  >
    <option disabled value={-1}>
      Select project
    </option>
    {Object.keys(PROJECTS).map(key => {
      const project = PROJECTS[key];

      return (
        <option key={project.id} value={project.id}>
          {project.icon} {project.name}
        </option>
      );
    })}
  </select>
);

ProjectSwitcher.defaultProps = {
  value: -1,
};

ProjectSwitcher.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default ProjectSwitcher;
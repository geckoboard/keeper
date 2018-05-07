import React from 'react';
import PropTypes from 'prop-types';
import PROJECTS from '../../../../projects';
import { values } from '../../utils';
import styles from './dropdown-project-switcher-styles.css';

const DropdownProjectSwitcher = ({ value, onChange }) => (
  <select
    className={styles.input}
    value={value}
    onChange={e => onChange(parseInt(e.target.value), 10)}
  >
    <option disabled value={-1}>
      Select project
    </option>
    {values(PROJECTS).map(project => (
      <option key={project.id} value={project.id}>
        {project.icon} {project.name}
      </option>
    ))}
  </select>
);

DropdownProjectSwitcher.defaultProps = {
  value: -1,
};

DropdownProjectSwitcher.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default DropdownProjectSwitcher;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './create-story-dropdown-styles.css';

const CreateStoryDropdown = ({ projects, onChange }) => (
  <select
    value={-1}
    className={styles.createStoryDropdown}
    onChange={e => {
      const id = parseInt(e.target.value, 10);
      const project = projects.find(p => p.id === id);

      onChange(project);
    }}
  >
    <option disabled value={-1}>
      Create a Clubhouse story
    </option>
    {projects.map(project => (
      <option key={project.id} value={project.id}>
        {project.name}
      </option>
    ))}
  </select>
);

CreateStoryDropdown.defaultProps = {
  projects: [],
};

CreateStoryDropdown.propTypes = {
  projects: PropTypes.array,
  onChange: PropTypes.func,
};

export default CreateStoryDropdown;

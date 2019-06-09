import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from './create-story-dropdown-styles.css';

const CreateStoryDropdown = ({ projects, onChange }) => (
  <div className={styles.createStoryDropdown}>
    <span className={styles.createStoryDropdown__plus}>
      <FontAwesomeIcon icon={icons.faPlus} className={styles.buttonCaret} />
    </span>
    {projects.length > 1 ? (
      <select
        value={-1}
        className={styles.createStoryDropdown__input}
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
    ) : (
      <button
        className={styles.createStoryDropdown__input}
        onClick={() => onChange(projects[0])}
      >
        Create a Clubhouse story
      </button>
    )}
  </div>
);

CreateStoryDropdown.defaultProps = {
  projects: [],
};

CreateStoryDropdown.propTypes = {
  projects: PropTypes.array,
  onChange: PropTypes.func,
};

export default CreateStoryDropdown;

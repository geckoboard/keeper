import React from 'react';
import PropTypes from 'prop-types';
import styles from './story-styles.css';

const Story = ({ name, id, app_url, colour }) => (
  <div
    className={styles.container}
    style={{
      borderColor: colour,
    }}
  >
    <span className={styles.title}>{name}</span>
    <div className={styles.meta}>
      <a
        className={styles.id}
        href={app_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        #{id}
      </a>
    </div>
  </div>
);

Story.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  app_url: PropTypes.string,
  colour: PropTypes.string,
};

export default Story;

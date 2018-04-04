import React from 'react';
import PropTypes from 'prop-types';
import styles from './story-styles.css';

const Story = ({ name, id, app_url }) => (
  <div className={styles.container}>
    <span className={styles.title}>
      {name}
    </span>
    <div className={styles.meta}>
      <a className={styles.id} href={app_url} target="_blank">
        #{id}
      </a>
    </div>
  </div>
);

Story.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  app_url: PropTypes.string,
};

export default Story;

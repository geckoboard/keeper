import React from 'react';
import PropTypes from 'prop-types';
import styles from './shimmer-styles.css';

const Shimmer = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.shimmer} />
    </div>
  );
};

Shimmer.propTypes = {
  children: PropTypes.any,
};

export default Shimmer;

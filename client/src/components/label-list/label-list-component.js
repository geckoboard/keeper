import React from 'react';
import PropTypes from 'prop-types';
import styles from './label-list-styles.css';

const LabelList = ({ labels }) => {
  return (
    <ul className={styles.label_list}>
      {labels.map(label => (
        <li key={label.name}>
          <span
            className={styles.label_dot}
            style={label.color && { background: label.color }}
          />
          {label.name}
        </li>
      ))}
    </ul>
  );
};

LabelList.defaultProps = {
  labels: [],
};

LabelList.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default LabelList;

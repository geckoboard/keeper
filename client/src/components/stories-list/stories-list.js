import React from 'react';
import PropTypes from 'prop-types';
import Story from '../story';

const StoriesList = ({ loading, stories }) => {
  if (loading) {
    return <span>Loading...</span>
  }

  return (
    <div>
      {stories.map(story => (
        <Story {...story} />
      ))}
    </div>
  );
};

StoriesList.PropTypes = {
  loading: PropTypes.bool,
  stories: PropTypes.array,
};

export default StoriesList;

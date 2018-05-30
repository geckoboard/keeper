import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../redux/actions';
import LinkedStory from './linked-story';

const mapDispatchToProps = (dispatch, props) => ({
  onDelete: () =>
    dispatch(
      actions.removeStoryFromGoal({
        goalId: props.goalId,
        storyId: props.story.id,
      }),
    ),
});

const LinkedStoryConnector = connect(null, mapDispatchToProps)(LinkedStory);

LinkedStoryConnector.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  goalId: PropTypes.number.isRequired,
};

export default LinkedStoryConnector;

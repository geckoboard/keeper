import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../redux/actions';
import LinkedStory from './linked-story';

const mapDispatchToProps = (dispatch, props) => ({
  onDelete: () =>
    dispatch(
      actions.removeStoriesFromGoal({
        goalId: props.goalId,
        storyIds: [props.story.id],
      }),
    ),
});

const LinkedStoryConnector = connect(
  null,
  mapDispatchToProps,
)(LinkedStory);

LinkedStoryConnector.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  goalId: PropTypes.number.isRequired,
};

export default LinkedStoryConnector;

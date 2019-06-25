import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../redux/actions';
import LinkedStoryDragWrapper from './linkedstory-drag-wrapper';

const mapDispatchToProps = (dispatch, props) => ({
  onSaveOrder: () => dispatch(actions.saveStoryOrders(props.goalId)),
  onDelete: () =>
    dispatch(
      actions.removeStoriesFromGoal({
        goalId: props.goalId,
        storyIds: [props.story.id],
      }),
    ),
  onChangeOrder: update => dispatch(actions.updateStoryOrder(update)),
});

const LinkedStoryConnector = connect(
  null,
  mapDispatchToProps,
)(LinkedStoryDragWrapper);

LinkedStoryConnector.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  goalId: PropTypes.number.isRequired,
};

export default LinkedStoryConnector;

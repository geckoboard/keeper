import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import StoryDragWrapper from './story-drag-wrapper';

const StoryConnector = connect(
  undefined,
  (dispatch, props) => ({
    onAddToGoal: goalId =>
      dispatch(
        actions.addStoryToGoal({
          goalId,
          storyId: props.id,
        }),
      ),
  }),
)(StoryDragWrapper);

export default StoryConnector;

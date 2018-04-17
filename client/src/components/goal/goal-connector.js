import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import GoalDragWrapper from './goal-drag-wrapper';

const mapStateToProps = (state, props) => {
  let stories = [];

  const loadingStories = state.stories.loading;
  const storyIds = props.goal.cards || [];

  storyIds.forEach(id => {
    const story = state.stories.entities[id];

    if (story) {
      stories.push(story);
    }
  });

  return {
    stories,
    loadingStories,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  onDelete: () => dispatch(actions.deleteGoal(props.goal.id)),
  onUpdate: title =>
    dispatch(
      actions.updateGoalTitle({
        id: props.goal.id,
        title,
      }),
    ),
});

const GoalConnector = connect(mapStateToProps, mapDispatchToProps)(
  GoalDragWrapper,
);

export default GoalConnector;

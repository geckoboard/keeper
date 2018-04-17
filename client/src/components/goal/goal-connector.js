import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import GoalDragWrapper from './goal-drag-wrapper';

const mapStateToProps = (state, props) => {
  const stories = props.goal.cards.reduce((acc, id) => {
    const story = state.stories.entities[id];

    if (story) {
      acc.push(story);
    }

    return acc;
  }, []);

  return {
    stories,
    loadingStories: state.stories.loading,
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

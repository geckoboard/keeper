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
    loadingStories: state.stories.loading || props.goal.isConvertingToStory,
    teamId: state.teams.current,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  createHandlers: stateProps => ({
    onDelete: () => dispatch(actions.deleteGoal(props.goal)),
    onChangeOrder: update => dispatch(actions.updateGoalOrder(update)),
    onSaveOrder: () => dispatch(actions.saveGoalOrders(stateProps.teamId)),
    onDeleteStories: storyIds =>
      dispatch(
        actions.removeStoriesFromGoal({
          goalId: props.goal.id,
          storyIds,
        }),
      ),
    onChangeTitle: title =>
      dispatch(
        actions.updateGoalTitle({
          id: props.goal.id,
          title,
        }),
      ),
  }),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps.createHandlers(stateProps),
  ...ownProps,
});

const GoalConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(GoalDragWrapper);

export default GoalConnector;

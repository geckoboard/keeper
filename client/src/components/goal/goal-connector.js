import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../redux/actions';
import GoalDragWrapper from './goal-drag-wrapper';
import PROJECTS from '../../../../projects';
import { values } from '../../utils';

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
  onChangeOrder: update => dispatch(actions.updateGoalOrder(update)),
  onSaveOrder: () => {
    const project = values(PROJECTS).find(
      p => p.slug === props.match.params.project,
    );

    dispatch(actions.saveGoalOrders(project.id));
  },
  onChangeTitle: title =>
    dispatch(
      actions.updateGoalTitle({
        id: props.goal.id,
        title,
      }),
    ),
});

const GoalConnector = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GoalDragWrapper),
);

export default GoalConnector;

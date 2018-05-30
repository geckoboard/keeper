import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddGoalForm from './add-goal-form';
import * as actions from '../../redux/actions';
import PROJECTS from '../../../../projects';
import { values } from '../../utils';

const mapStateToProps = state => {
  const orders = state.goals.entities.map(goal => goal.order);

  return {
    nextOrder: orders.length === 0 ? 1 : Math.max(...orders) + 1,
    isEmpty: !state.goals.loading && state.goals.entities.length === 0,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  createHandlers: state => ({
    onSubmit: title => {
      const project = values(PROJECTS).find(
        p => p.slug === props.match.params.project,
      );

      dispatch(
        actions.addGoal({
          project: project.id,
          order: state.nextOrder,
          title,
        }),
      );
    },
  }),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...dispatchProps.createHandlers(stateProps),
  isEmpty: stateProps.isEmpty,
});

const AddGoalFormConnector = withRouter(
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(AddGoalForm),
);

export default AddGoalFormConnector;

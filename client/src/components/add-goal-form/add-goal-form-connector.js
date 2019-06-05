import { connect } from 'react-redux';
import AddGoalForm from './add-goal-form';
import * as actions from '../../redux/actions';
import { getGoals } from '../../redux/helpers';

const mapStateToProps = state => {
  const goals = getGoals(state);
  const orders = goals.map(goal => goal.order);

  return {
    nextOrder: orders.length === 0 ? 1 : Math.max(...orders) + 1,
    isEmpty: goals.length === 0,
    team: state.teams.current,
  };
};

const mapDispatchToProps = dispatch => ({
  createHandlers: state => ({
    onSubmit: title => {
      dispatch(
        actions.addGoal({
          team: state.team,
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

const AddGoalFormConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(AddGoalForm);

export default AddGoalFormConnector;

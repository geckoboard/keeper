import { connect } from 'react-redux';
import AddGoalForm from './add-goal-form';
import * as actions from '../../redux/actions';

const mapStateToProps = state => {
  const orders = state.goals.entities.map(goal => goal.order);

  return {
    nextOrder: orders.length === 0 ? 1 : Math.max(...orders) + 1,
    isEmpty: !state.goals.loading && state.goals.entities.length === 0,
    team: state.teams.current,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
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

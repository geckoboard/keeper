import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Goal from './goal';

const GoalConnector = connect(undefined, (dispatch, props) => ({
  onDelete: () => dispatch(actions.deleteGoal(props.goal.id)),
}))(Goal);

export default GoalConnector;
